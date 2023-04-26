import AddRemoveRows from "./add-remove-rows.svelte";
import AddRows from "./add-rows.svelte";
import AnimatedNumbers from "./animated-numbers.svelte";

export interface Code {
	delay?: number;
	fileName: string;
	contents: string;
}

export interface Thing {
	heading: string;
	text: string;
	link: {
		label: string;
		url: string;
	},
	code: Code,
	Component: any;
}

export const things: Thing[] = [
	{
		heading: 'Incrementally Maintained Views',
		text: 'Write complex SQL transformations as materialized views that efficiently update themselves as inputs change.',
		link: {
			label: 'Learn More',
			url: 'https://materialize.com/docs/overview/'
		},
		code: {
			delay: 2000,
			fileName: 'incremental.sql',
			contents: `CREATE MATERIALIZED VIEW my_view AS
	SELECT userid, COUNT(api.id), COUNT(pageviews.id)
	FROM users
	JOIN pageviews on users.id = pageviews.userid
	JOIN api ON users.id = api.userId
	GROUP BY userid;`
		},
		Component: AnimatedNumbers
	},
	{
		heading: 'Sliding Windows',
		text: 'Write queries that filter to a window of time anchored to the present, Materialize will update results as time advances.',
		link: {
			label: 'Learn More',
			url: 'https://materialize.com/docs/sql/patterns/temporal-filters/'
		},
		code: {
			fileName: 'sliding.sql',
			contents: `CREATE MATERIALIZED VIEW my_window AS
	SELECT date_trunc('minute', received_at),
	COUNT(*) as order_ct, SUM(amount) as revenue
	FROM orders
	WHERE mz_now() < received_at + interval '5 minutes'
	GROUP BY 1;`
		},
		Component: AddRemoveRows
	},
	{
		heading: 'SQL Alerting',
		text: 'Write alerts as SQL queries with filters and subscribe to new rows as they appear.',
		link: {
			label: 'Learn More',
			url: '/blog'
			// url: '/blog/real-time-data-quality-tests-using-dbt-and-materialize/'
		},
		code: {
			fileName: 'alerting.sql',
			contents: `SELECT userID, email, MAX(orders.id) as last_order
  FROM users
  JOIN orders ON orders.userID = users.id
  GROUP BY userId, email
  -- Use a filter to surface users with a high % of fraud
  HAVING SUM(is_fraud) / COUNT(orders.id)::FLOAT > 0.5;`
		},
		Component: AddRows
	}
];
