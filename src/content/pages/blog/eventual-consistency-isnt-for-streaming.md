---
layout: 'Post'
title: "Eventual Consistency isn't for Streaming"
date: '2020-07-14'
category: 'Technical Article'
image: 'https://res.cloudinary.com/mzimgcdn/image/upload/v1665546890/eventual-consistency.webp'
people_refs:
  - frank-mcsherry
description: 'Eventual consistency is common for key-value stores, where the trade-off is well understood and manageable. But in a streaming system, eventual consistency creates unboundedly large and systematic errors.'
---

Streaming systems consume inputs and produce outputs asyncronously: the output of a system at any moment may not reflect all of the inputs seen so far. These systems provide various guarantees about how their outputs relate to their input. Among the weaker (but not unpopular) guarantees is [eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency). Informally, eventual consistency means if the input stops changing, the output will eventually arrive at the correct result.

In this post we'll see that for as long as its input streams haven't been stopped, natural eventually consistent computations can produce _**unboundedly large and systematic errors**_. If you are doing even slightly non-trivial computations, you should be prepared for your results to be _**never-consistent**_ (a much less popular consistency definition). Until you pause the input streams and await correct answers, at least.

Not all is lost! There are stream processing systems that provide strong consistency guarantees. [Materialize](https://materialize.io) and [Differential Dataflow](https://github.com/TimelyDataflow/differential-dataflow) both avoid these classes of errors by providing _**always correct**_ answers, as do several other streaming systems.

If you want to avoid systematic and on-going errors in your results, you should probably check if the stream processor you use provides stronger consistency guarantees.

## Background on Eventual Consistency

To quote from the [Wikipedia page on eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency)

Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value.

Eventual consistency is most often invoked for key-value stores, where each key tracks an independent value and one can reasonably imagine not updating the value associated with a key for long enough that the right answer might shake out. For example, if a database stores a map from people to their addresses, your update to your own address might not be visible immediately, but if you give it a few minutes it will probably sort itself out (if you don't further update your address).

The requirement is only that folks stop updating a specific key, not that they stop using the database entirely. The rest of the world can keep reading out addresses, even keep reading out your stale address, and an eventually consistent system is obliged to eventually update your address (assuming you don't keep re-submitting updates). Eventual consistency is a workable definition of consistency for key-value stores, where the vast majority of operations do not conflict, and one can reasonably expect to wait out any inconsistency.

Is eventual consistency a workable definition of consistency for streaming computations?

## Streaming computations

There are many streaming computations out there. I'm going to focus on a class that lines up well with our study of consistency: incremental view maintenance. Incremental view maintenance is where you've defined a view, essentially a name bound to a query, and want to see the output answers change as the input data change.

Let's say you've defined a query that could be applied to a static dataset, something like

```sql
-- count the records in `data`
select count(*) from data
```

Now, the underlying `data` might change. As they do, we should produce the corresponding changes to the output. In this case, we would like to see how the `count` of the records in `data` have changed.

There are more complicated queries we might write. For example, this query determines the set of keys whose values are the largest among all keys:

```sql
-- select keys with maximum values
select data.key
from data
where data.value in (select max(data.value) from data)
```

As `data` change, we would like to see the resulting set of keys track the maximum values

This next query determines the standard deviation of values for each key, and then selects out those values that are surprisingly large.

```sql
-- determine average and stddev for groups
create view stats_by_key
select
    data.key,
    avg(data.value) as average,
    stddev(data.value) as deviation
from data
group by data.key;

-- select out surprisingly large values
select data.key, data.value
from data, stats_by_key
where
    data.key = stats_by_key.key and
    data.value > average + 3 * devation
```

As `data` move around, the set of current outliers moves around too, and we would be delighted to be warned of them so that we can take some important action.

I don't have strong opinions about whether these are exciting queries to compute, but we'll use them as examples of streaming computations that can go surprisingly wrong. If your computations are more sophisticated than these examples, you might have even more to worry about.

## Eventual consistency in streaming: example 1

What does a naive application of eventual consistency have to say about

```sql
-- count the records in `data`
select count(*) from data
```

It's not really clear, is it? Even if there were clear keys we are writing to, the thing we want to be correct is an aggregation across all of them rather than the value associated with a specific key. That result depends on all values. We could still extrapolate the definition of eventual consistency out to mean that if the input stops changing entirely, the system will eventually update to the correct count of records in `data`.

Although you shouldn't expect to see this in the wild, an eventually consistent streaming system is certainly permitted to delay its processing as long as there are any outstanding input records that haven't been processed yet.

This is actually not as unreasonable as you might think. Many stream processors intentionally batch up their inputs to improve their efficiency, and get started only once they get a moment of fresh air in their input stream. This technique allows them to improve their throughput during load spikes, by batching and re-ordering updates (for example, bundling all updates to the same key). It would be natural to see updates out of order, but taken to the extreme this technique results is no updates during the load spike.

While this is not necessarily something you'll see in a professional stream processor, nothing about eventual consistency prevents behavior like this. So, while it's not the most realistic reason to be worried about eventual consistency, it paints a bit of a picture about what we might need to watch out for.

Let's ignore the possibility that a technically correct eventually consistent processor could produce no results, and instead look at what happens for more reasonable systems on continually changing input streams.

## Eventual consistency in streaming: example 2

Let's take the query that selects out the keys with maximum values:

```sql
-- select keys with maximum values
select data.key
from data
where data.value in (select max(data.value) from data)
```

This is how you express "argmax" in SQL, and it is roughly equivalent to a join between the collections `data` and `select max(data.value) from data`.

A reasonable person might expect to see the keys with maximum values here, and have an eventually consistent system eventually show it some maximal keys. Some head scratching and you might walk that back to "any keys at all" because they might no longer be maximal at the moment you see them. But _**eventually**_ we should see _**some**_ keys, right?

Nope.

At least, not as long as the input stream is allowed to change.

Imagine the join between `data` and `select max(data.value) from data` receives its eventually consistent inputs consistently later for `data` than for `select max(data.value) from data`. This is not unreasonable, as it can be easier to maintain a `max` than to maintain an entire collection (`data`). As each record of `data` arrives, even those records with maximal values at the time of their submission may find that the maximum has advanced before they got there. They no longer match the maximum value, and are not produced as output.

Let's demonstrate this in [Differential Dataflow](https://github.com/TimelyDataflow/differential-dataflow). We'll have to fake some things out, because its consistency guarantees are unfortunately too strong. Fortunately, we can directly program transient delays in to the dataflow.

Imagine a collection that may have multiple keys in it, but we'll only need one. We'll increment the value associated with the key regularly (perhaps this is bandwidth used, or money spent, or most recent access, or ...). Importantly, we'll delay the update along one path by the gap in time between updates.

```rust
// Global aggregation of values, on-time.
let input1 =
data.map(|(key,val)| ((),val))
    .max_by_key() // not real; should be `reduce(...)`.
    .map(|((), val)| (val, ()));

// Delayed map from values back to their keys.
let input2 =
data.delay(|t| t + 1)
    .map(|(key,val)| (val,key));

// Observe any results
input2.semijoin(&input)
      .inspect(|x| println!("KEY: {:?}", x));
```

We'll feed in changes that add elements to `data`, one at a time. Roughly like so

```
(key, 1000)
(key, 2000)
(key, 3000)
...
```

The keys and values aren't important, other than that the maximum increases. If the maximum increases within the time of the delay associated with the "eventual" nature of the consistency, we see no results:

```
    Finished dev [unoptimized + debuginfo] target(s) in 0.04s
     Running `target/debug/examples/eventual`
Round 0 complete
Round 1 complete
Round 2 complete
Round 3 complete
Round 4 complete
Round 5 complete
...
```

Suffice it to say we didn't see any `KEY` reports. We would, eventually, if we were to stall the input stream and allow one of the inputs to the join to catch up to the other.

What happens if we `delay` the `max` computation instead of the `data` stream? If the updates overwrite their previous values (_**i.e.**_ if `(key, 2000)` overwrites `(key, 1000)`) then we also see no outputs, because by the time the maximum arrives the value has changed.

Eventual consistency is pretty badly suited to problem of aligning data, when the contents of either of those streams of data can be expected to move on. In our case, the maximum is regularly advancing, and consequently not found when delayed data want to look for it. Alternately, the maximum is regularly behind, and can no longer find the values that produced it. Maybe you'll be lucky and it will always be neither!

## Eventual consistency in streaming: example 3

Let's take a third swing using the simplest "statistical" example I could think up. In this example, we'll determine the average and the [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation), and look for records that are more than a few deviations away from the the average.

```sql
-- determine average and stddev for groups
create view stats_by_key
select
    data.key,
    avg(data.value) as average,
    stddev(data.value) as deviation
from data
group by data.key;

-- select out surprisingly large values
select data.key, data.value
from data, stats_by_key
where
    data.key = stats_by_key.key and
    data.value > average + 3 * devation
```

The standard deviation is the square root of the [variance](https://en.wikipedia.org/wiki/Variance), which is the average of the squared distances from the average.

As data change the average changes, and it would be annoying to have to return to all of your prior data to update the the squared distance from the average. Fortunately, there is a clever way to _**maintain**_ the variance of a stream of numbers, by using a different formula for the variance:

```
var(X) = avg_x x^2 - (avg_x x)^2
```

These two averages can each be maintained incrementally (by a count and a sum). This seems great on paper, and modulo [some numerical stability issues](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance) does work out relatively well (we currently use it in Materialize).

But ... what happens if the aggregates are not exactly in sync? To give you a taste of the sort of anxiety we'll soon be rolling in, recall that the variance should always be non-negative. We can confirm this because its terms in difference have a bounded relationship:

```
avg_x x^2 >= (avg_x x)^2
```

The average square is always at least the squared average. This ensures that the variance is always non-negative.

At least, it ensures it when these two sums are _**consistent**_.

If these two sums are computed along dataflow paths that are not always consistent, the second term can be larger than the first, and the variance can apparently go negative. If you take the square root, ... well obviously that doesn't work (relevant question: does your stream processor correctly recover from exceptions?) .

But let's say that the variance doesn't actually go negative and it just ends up surprisingly small. Our query up above, recall, pulls out records that are multiple standard deviations from where they should be. If the deviation is nearly zero, that could be everyone above average. Or, because the average is transiently large, perhaps everyone above that. Who even knows?

And that is one of the pain points for eventual consistency in streaming: who even knows?

If you wanted to use the information above to make decisions, it could often be wrong. Let's say you want to wait for it to be correct; how long do you wait? If you want to flag a purchase as risky, or bite at an offer that seems surprisingly good, or perform some other low-latency action that has consequences ... how do you do that? How much time do you have to build in to your "low latency" system to account for transient wrongness?

Who even knows.

## Testing for consistency errors

It's reasonable at this point to worry a bit about inconsistency. There are some natural smoke tests you can do to see if your data are not always consistent. I thought I'd talk through one of them, if for no other reason than to show off something working correctly.

We often distill large collections down to [histograms](https://en.wikipedia.org/wiki/Histogram) by counting the number of occurrences of each value in the collection. I have a collection of NYC taxi rides which record each ride with information like the passenger count, fare amount, and distance. We could reasonably be interested in the number of times we see each (passenger count, fare amount) pair, or each (passenger count, distance) pair, or each (fare amount, distance pair).

```rust
// Collections containing pairs of interest, with multiplicities.
let histogram1 = taxi.map(|data| (data.passengers, data.fare));
let histogram2 = taxi.map(|data| (data.passengers, data.distance));
let histogram3 = taxi.map(|data| (data.fare, data.distance));
```

Each of these histograms could be independently interesting; we could count the results for each pair, or track the number of distinct pairs, or track the pair with the largest count. We could try and determine any of the three exhibit a correlation between their pair of attributes.

Each of these histograms also define a histogram over the individual attributes it has retained. Both `histogram1` and `histogram2` tell us how many of each passenger count there are. Both `histogram1` and `histogram3` tell us how often each fare is paid. Both `histogram2` and `histogram3` tell us the distribution of distances of trips.

Ideally each of these single-variable histograms are exactly identical, always.

```rust
// Extract single-variable histograms.
let histogram1a = histogram1.map(|(a,b)| a);
let histogram1b = histogram1.map(|(a,b)| b);
let histogram2a = histogram1.map(|(a,c)| a);
let histogram2c = histogram1.map(|(a,c)| c);
let histogram3b = histogram1.map(|(b,c)| b);
let histogram3c = histogram1.map(|(b,c)| c);

// These collections should be always empty.
let errors_a = histogram1a.concat(histogram2a.negate());
let errors_b = histogram1b.concat(histogram3b.negate());
let errors_c = histogram2c.concat(histogram3c.negate());
```

We can attach monitors to each of the `error` streams and complain loudly if there is ever a single record present. Differential dataflow has a method [`assert_empty()`](https://docs.rs/differential-dataflow/0.11.0/differential_dataflow/collection/struct.Collection.html#method.assert_empty) that does exactly this. If you run it on these `errors_*` collections it produces no such reports, as differential dataflow doesn't have even transient inconsistencies.

## Conclusions

Eventual consistency may make some sense for key-value stores, but it doesn't seem to make much sense for _**computations**_ that have _**low-latency requirements**_. If your stream processor only provides eventual consistency guarantees, you should have a very serious think about what you actual expect it to do for you.

That being said, there are systems like [Noria](https://github.com/mit-pdos/noria) that target keyed look-ups for maintained views, for which you might reasonably expect updates to cease for the records that influence your query results. These systems may give surprising results for "analytic" queries, but if you aren't planning on doing that (or can absorb that complexity) then their consistency guarantees might be fine for you.

Ultimately, consistency guarantees come down to how much the system is planning on guaranteeing for you, and how much additional work you'll need to do between it and your use case. At Materialize we're betting that most of you don't want to become consistency experts, and don't want surprisingly incorrect results.

If you are interested in consistent SQL views of your continually changing data, [register for a Materialize account here](/register/) to get started, check out [the documentation](https://materialize.com/docs/), or dig into [the code](https://github.com/MaterializeInc/materialize) in our repository!
