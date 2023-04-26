<script lang="ts">
	import type { DiagramBlockType } from '$lib/types/feature.type';

	export let variant: DiagramBlockType;

	import './diagram-block.postcss';
</script>

<div
	class="diagram-block md:transform- flex-1 flex justify-center text-default-content text-sm w-full"
>
	{#if variant === 'dbt'}
		<div class="relative h-auto w-[270px] mr-12 font-mono">
			<svg
				class="text-blue absolute mz_diagram top-8 -right-12 h-full w-16"
				stroke="url(#orangeToPurple)"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M80 15 C40 15 40 46 0 46" stroke-width="6" />
				<path d="M80 25 C40 2 40 96 0 96" stroke-width="6" />

				<defs>
					<linearGradient
						id="orangeToPurple"
						x1="0"
						y1="0"
						x2="64"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stop-color="#f97316" />
						<stop offset="0.95" stop-color="#7F4EFFCC" />
						<stop offset="1" stop-color="#7F4EFF00" />
					</linearGradient>
				</defs>
			</svg>
			<div class="mb-4">
				<img
					class="inline-block relative -top-0.5"
					src={`${process.env.basePath}/images/dbt-bit_tm.svg`}
					width="28"
					height="28"
					alt="dbt logo"
				/>
				<span class="font-bold">dbt</span>
			</div>
			<div
				class="relative w-full max-w-md inline-block mx-auto bg-orange-400 bg-opacity-30 rounded-lg p-4 text-left space-y-3"
			>
				<div class="flex justify-between gap-3">
					<div class="flex items-center">
						dbt CLI
						<br />
						Commands
					</div>
					<div class="grow flex flex-col gap-1">
						<div class="group relative inline-block">
							<div
								class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-orange to-orange-500 blur-lg opacity-25 transition-opacity"
							/>
							<div
								class="relative w-full h-10 inline-block rounded-lg bg-gradient-to-br from-mz-orange to-orange-500 shadow-m opacity-75 "
							/>
							<a
								class="absolute h-8 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs"
							>
								<span class="font-mono text-xs">&gt; dbt run</span>
							</a>
						</div>

						<div class="group relative inline-block">
							<div
								class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-orange to-orange-500 blur-lg opacity-25 transition-opacity"
							/>
							<div
								class="relative w-full h-10 inline-block rounded-lg bg-gradient-to-br from-mz-orange to-orange-500 shadow-m opacity-75 "
							/>
							<a
								class="absolute h-8 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs"
							>
								<span class="font-mono text-xs">&gt; dbt test</span>
							</a>
						</div>
					</div>
				</div>
				<div class=" flex flex-col gap-2">
					dbt Project (git repo)
					<div
						class="rounded-lg border border-white border-opacity-60 border-dashed flex justify-center items-center px-2 py-1 flex-1"
					>
						SQL Models
					</div>
					<div
						class="rounded-lg border border-white border-opacity-60 border-dashed flex justify-center items-center px-2 py-1 flex-1"
					>
						SQL Tests
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if variant === 'default'}
		<div class="relative basis-[280px]">
			<svg
				class="text-blue absolute bottom-10 right-0 w-full mz_diagram h-12 opacity-60"
				stroke="url(#blueToPurple)"
				fill="none"
				stroke-dasharray="16 2"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path class="input" d="M0 24 H280" stroke-width={24} />
				<defs>
					<linearGradient
						id="blueToPurple"
						x1="0"
						y1="0"
						x2="280"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#1EAEFF00" />
						<stop offset="0.5" stop-color="#1EAEFF" />
						<stop offset="0.95" stop-color="#AD37E5" />
						<stop offset="1" stop-color="#AD37E500" />
					</linearGradient>
				</defs>
			</svg>

			<svg
				class="text-blue absolute mz_diagram top-0 -right-3 w-[92px] opacity-60"
				stroke="url(#blueToPurple2)"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path class="write" d="M80 20 C40 20 40 54 0 54" stroke-width="12" />
				<path d="M80 20 C40 20 40 54 0 54" stroke-width={6} />
				<defs>
					<linearGradient
						id="blueToPurple2"
						x1="0"
						y1="0"
						x2="120"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stop-color="#1EAEFFCC" />
						<stop offset="0.95" stop-color="#AD37E5CC" />
						<stop offset="1" stop-color="#AD37E500" />
					</linearGradient>
				</defs>
			</svg>

			<div class="absolute top-8 right-8 -translate-x-12 ">
				<span class="font-mono absolute -top-8 w-24 -left-0 text-center text-important"
					>SQL Writes</span
				>
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25 transition-opacity"
				/>
				<div
					class="relative w-24 h-10 inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<span
					class="absolute h-8 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs"
				>
					<a href="https://materialize.com/docs/sql/insert/" class="link"> INSERT </a>
				</span>
			</div>

			<div class="database absolute bottom-14 transform -translate-x-[20px] sm:left-0 md:left-8">
				<span class="font-mono absolute -top-8 w-20 -left-1 text-center">
					<a href="https://materialize.com/docs/integrations/#databases" class="text-important">
						Databases
					</a>
				</span>
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25 transition-opacity"
				/>
				<div
					class="relative w-[72px] h-[72px] inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<div
					class="absolute h-16 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content"
				>
					<svg
						width="41"
						height="32"
						viewBox="0 0 41 32"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.712395 10.1983L19.7057 18.2735C19.8743 18.345 20.0576 18.3818 20.2401 18.3818C20.4227 18.3818 20.606 18.345 20.7746 18.2735L39.7701 10.1983C40.2048 10.0139 40.4819 9.62159 40.4819 9.19122C40.4819 8.76086 40.2048 8.36854 39.7701 8.18419L20.7753 0.108248C20.4374 -0.0360826 20.0437 -0.0360826 19.7057 0.108248L0.712395 8.18419C0.277663 8.36854 0.000549316 8.76086 0.000549316 9.19122C0.000549316 9.62159 0.277663 10.0139 0.712395 10.1983ZM20.2401 2.34996L36.3304 9.19122L20.2401 16.0318L4.1514 9.19122L20.2401 2.34996Z"
						/>
						<path
							d="M40.3614 15.5212C40.0652 14.9649 39.3211 14.7281 38.7002 14.9925L20.2398 22.8401L1.78166 14.9925C1.15852 14.7281 0.417354 14.9649 0.120446 15.5212C-0.174262 16.0789 0.0903884 16.7428 0.712062 17.0079L19.7054 25.0831C19.874 25.1546 20.0573 25.1907 20.2398 25.1907C20.4224 25.1907 20.6056 25.1546 20.7743 25.0831L39.7698 17.0072C40.3914 16.7435 40.6561 16.0782 40.3614 15.5212Z"
						/>
						<path
							d="M40.3614 22.3305C40.0652 21.7728 39.3211 21.5386 38.7002 21.8017L20.2398 29.6493L1.78166 21.8017C1.15852 21.5386 0.417354 21.7728 0.120446 22.3305C-0.174262 22.8874 0.0903884 23.5514 0.712062 23.8171L19.7054 31.8924C19.874 31.9639 20.0573 31.9999 20.2398 31.9999C20.4224 31.9999 20.6056 31.9639 20.7743 31.8924L39.7698 23.8164C40.3914 23.5527 40.6561 22.8868 40.3614 22.3305Z"
						/>
					</svg>
				</div>
			</div>

			<div class="absolute bottom-14 right-12">
				<span class="font-mono absolute -top-12 w-20 -left-1 text-center">
					<a
						href="https://materialize.com/docs/integrations/#message-brokers"
						class="text-important"
					>
						Message Brokers
					</a>
				</span>
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25 transition-opacity"
				/>
				<div
					class="relative w-[72px] h-[72px] inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<div
					class="absolute h-16 inset-1 bg-default-focus rounded border border-default flex justify-center items-center font-mono text-center text-default-content"
				>
					<svg
						width="45"
						height="22"
						viewBox="0 0 45 22"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M34.9563 0.373995L27.1942 10.3398C27.1254 10.4283 27.0901 10.5245 27.0901 10.6203C27.0901 10.716 27.1254 10.8122 27.1942 10.9007L34.9563 20.8677C35.1335 21.0958 35.5106 21.2412 35.9243 21.2412C36.3379 21.2412 36.715 21.0958 36.8922 20.8677L44.655 10.9011C44.7937 10.7237 44.7937 10.5172 44.655 10.3398L36.8922 0.373995C36.715 0.14589 36.3379 0.000487913 35.9243 0.000487895C35.5106 0.000487877 35.1335 0.14589 34.9563 0.373995ZM42.5002 10.6203L35.9243 19.0628L29.349 10.6203L35.9243 2.17845L42.5002 10.6203Z"
						/>
						<path
							d="M29.8398 21.1777C30.3745 21.0223 30.6022 20.6319 30.348 20.3061L22.8047 10.6199L30.348 0.934844C30.6022 0.60788 30.3745 0.218987 29.8398 0.0631984C29.3037 -0.091436 28.6656 0.0474269 28.4108 0.373621L20.6487 10.3395C20.58 10.4279 20.5453 10.5241 20.5453 10.6199C20.5453 10.7157 20.58 10.8118 20.6487 10.9003L28.4114 20.8673C28.6649 21.1935 29.3044 21.3323 29.8398 21.1777Z"
						/>
						<path
							d="M23.2945 21.1777C23.8305 21.0223 24.0556 20.6319 23.8028 20.3061L16.2595 10.6199L23.8028 0.934844C24.0556 0.60788 23.8305 0.218987 23.2945 0.0631984C22.7591 -0.091436 22.121 0.0474269 21.8656 0.373621L14.1034 10.3395C14.0347 10.4279 14 10.5241 14 10.6199C14 10.7157 14.0347 10.8118 14.1034 10.9003L21.8662 20.8673C22.1197 21.1935 22.7598 21.3323 23.2945 21.1777Z"
						/>
						<path
							d="M16.2945 21.1777C16.8305 21.0223 17.0556 20.6319 16.8028 20.3061L9.25948 10.6199L16.8028 0.934844C17.0556 0.60788 16.8305 0.218987 16.2945 0.0631984C15.7591 -0.091436 15.121 0.0474269 14.8656 0.373621L7.10345 10.3395C7.03471 10.4279 7.00003 10.5241 7.00003 10.6199C7.00003 10.7157 7.03471 10.8118 7.10345 10.9003L14.8662 20.8673C15.1197 21.1935 15.7598 21.3323 16.2945 21.1777Z"
						/>
						<path
							d="M9.2945 21.1777C9.83052 21.0223 10.0556 20.6319 9.80277 20.3061L2.25948 10.6199L9.80277 0.934844C10.0556 0.60788 9.83052 0.218987 9.29451 0.0631984C8.75912 -0.091436 8.12095 0.0474269 7.86556 0.373621L0.103446 10.3395C0.0347104 10.4279 2.62429e-05 10.5241 2.62387e-05 10.6199C2.62345e-05 10.7157 0.0347104 10.8118 0.103446 10.9003L7.86619 20.8673C8.11969 21.1935 8.75975 21.3323 9.2945 21.1777Z"
						/>
					</svg>
				</div>
			</div>
		</div>
	{/if}

	<div class="relative h-80 space-y-3 font-mono text-default-content">
		{#if variant === 'dbt'}
			<div>
				<img
					class="inline-block relative -top-0.5"
					src={`${process.env.basePath}/images/materialize-logo-mark-color.svg`}
					width="28"
					height="28"
					alt="Materialize logo"
				/>
				<span class="font-bold">Materialize</span>
			</div>
		{/if}
		<div class="relative w-full bg-purple-400 bg-opacity-30 rounded-lg p-2 px-4 text-left">
			<span class="font-mono text-important font-semibold">SQL Control Plane</span>
			<svg
				class="absolute -bottom-8 left-1/2 -translate-x-6 w-12 h-10 mz_diagram text-mz-purple-400 z-10"
				fill="none"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				stroke-linecap="round"
				stroke-width={5}
			>
				<path d="M12 6 V24" />
				<path d="M6 12 L12 6 L18 12" />
				<path d="M36 6 V24" />
				<path d="M30 18 L36 24 L42 18" />
			</svg>
		</div>
		<div class="relative w-full bg-purple-400 bg-opacity-30 rounded-lg p-4 pt-10 flex gap-3">
			<span class="absolute font-mono top-2 left-4 text-important font-semibold">
				Compute (<a href="https://materialize.com/docs/overview/key-concepts/#clusters">Clusters</a
				>)
			</span>
			<svg
				class="absolute -bottom-8 left-1/2 -translate-x-6 w-12 h-10 mz_diagram text-mz-purple-400 z-10"
				fill="none"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				stroke-linecap="round"
				stroke-width={5}
			>
				<path d="M12 6 V24" />
				<path d="M6 12 L12 6 L18 12" />
				<path d="M36 6 V24" />
				<path d="M30 18 L36 24 L42 18" />
			</svg>
			<div
				class="hidden lg:flex bg-gradient-to-br from-mz-lavender to-mz-purple-400 rounded-lg p-2 flex-col gap-2"
			>
				<div
					class="rounded-lg border border-white border-opacity-60 border-dashed flex justify-center items-center px-2 py-1 flex-1 text-white"
				>
					In-Memory Indexes
				</div>
				<div
					class="rounded-lg border border-white border-dashed border-opacity-60 flex justify-center items-center px-2 py-1 flex-1 text-white"
				>
					Dataflows
				</div>
			</div>
			<div class="relative grow lg:grow-0">
				<div class="absolute inset-0 translate-x-2 translate-y-2 bg-mz-purple-400 rounded-lg" />
				<div
					class="absolute border-b border-r border-mz-purple-600 inset-0 translate-x-1 translate-y-1 shadow-lg bg-mz-purple-400 rounded-lg"
				/>

				<div
					class="relative border-b border-r border-mz-purple-600 bg-gradient-to-br from-mz-lavender to-mz-purple-400 rounded-lg p-2 flex flex-col gap-2"
				>
					<div
						class="rounded-lg border border-white border-opacity-60 border-dashed flex justify-center items-center px-2 py-1 flex-1 text-white"
					>
						In-Memory Indexes
					</div>
					<div
						class="rounded-lg border border-white border-dashed border-opacity-60 flex justify-center items-center px-2 py-1 flex-1 text-white"
					>
						Dataflows
					</div>
				</div>
			</div>
		</div>
		<div class="relative w-full bg-purple-400 bg-opacity-30 rounded-lg pt-9 pb-4 flex">
			<span class="absolute font-mono top-2 left-4 font-semibold text-important">Storage (S3)</span>
			<div
				class="rounded-lg bg-gradient-to-br from-mz-lavender to-mz-purple-400 flex justify-center items-center py-1 w-20 -translate-x-4"
			>
				<a href="https://materialize.com/docs/overview/key-concepts/#sources" class="text-white">
					Sources
				</a>
			</div>
			<div
				class={`${
					variant === 'minimal'
						? 'bg-mz-turquois/70 border border-mz-turquois text-mz-black rounded-lg p-2'
						: 'text-important'
				} flex-1 flex justify-center items-center`}
			>
				<div>
					Source Data, Tables,
					<br />
					<a href="https://materialize.com/docs/overview/key-concepts/#materialized-views"
						>Materialized Views</a
					>
				</div>
			</div>
			<div
				class="rounded-lg bg-gradient-to-br from-mz-lavender to-mz-purple-400 flex justify-center items-center py-1 w-20 translate-x-4"
			>
				<a href="https://materialize.com/docs/overview/key-concepts/#sinks" class="text-white">
					Sinks
				</a>
			</div>
		</div>
	</div>
	{#if !(variant === 'minimal')}
		<div class={`relative basis-[280px] ${variant === 'dbt' ? 'translate-y-8' : ''}`}>
			<svg
				class="text-blue absolute mz_diagram top-0 left-0 h-full w-24 opacity-60"
				stroke="url(#purpleToGreen)"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path class="query" d="M0 15 C40 15 40 52 80 52" stroke-width={9} />
				<path d="M0 15 C40 15 40 52 80 52" stroke-width={6} />

				<path class="stream2" d="M0 25 C40 25 40 116 80 116" stroke-width={9} />
				<path d="M0 25 C40 25 40 116 80 116" stroke-width={6} />

				<defs>
					<linearGradient
						id="purpleToGreen"
						x1="0"
						y1="0"
						x2="64"
						y2="0"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#7F4EFF00" />
						<stop offset=".3" stop-color="#7F4EFF" />
						<stop offset="1" stop-color="#13D461" />
					</linearGradient>
				</defs>
			</svg>
			<svg
				class="text-blue absolute bottom-12 left-0 w-20 mz_diagram h-8 opacity-60"
				stroke="url(#purpleToGreen)"
				fill="none"
				stroke-dasharray="16 2"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path class="input" d="M0 24 H80" stroke-width={32} />
			</svg>

			<div class=" absolute top-8 left-20 ">
				<span class="font-mono absolute -top-8 w-28 -left-0 text-center text-important"
					>SQL Reads</span
				>
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25"
				/>
				<div
					class="relative w-28 h-10 inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<div
					class="absolute h-8 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs"
				>
					<a href="https://materialize.com/docs/sql/select/" class="link"> SELECT </a>
				</div>
			</div>

			<div class=" absolute top-24 left-20 ">
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25"
				/>
				<div
					class="relative w-28 h-10 inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<div
					class="absolute h-8 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs"
				>
					<a href="https://materialize.com/docs/sql/subscribe/" class="link"> SUBSCRIBE </a>
				</div>
			</div>

			<div class="absolute bottom-4 left-20 ">
				<span class="font-mono absolute -top-8 w-32 -left-7 text-center text-important"
					>Message Brokers</span
				>
				<div
					class="absolute inset-0 top-1 translate-y-1 rounded-lg bg-gradient-to-br from-mz-green to-mz-blue blur-lg opacity-25"
				/>
				<div
					class="relative w-[72px] h-[72px] inline-block rounded-lg bg-gradient-to-br from-mz-green to-mz-blue shadow-m opacity-75"
				/>
				<div
					class="absolute h-16 inset-1 bg-default-focus rounded border border-default flex justify-center items-center text-default-content font-mono text-xs text-center"
				>
					<svg
						width="45"
						height="22"
						viewBox="0 0 45 22"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M34.9563 0.373995L27.1942 10.3398C27.1254 10.4283 27.0901 10.5245 27.0901 10.6203C27.0901 10.716 27.1254 10.8122 27.1942 10.9007L34.9563 20.8677C35.1335 21.0958 35.5106 21.2412 35.9243 21.2412C36.3379 21.2412 36.715 21.0958 36.8922 20.8677L44.655 10.9011C44.7937 10.7237 44.7937 10.5172 44.655 10.3398L36.8922 0.373995C36.715 0.14589 36.3379 0.000487913 35.9243 0.000487895C35.5106 0.000487877 35.1335 0.14589 34.9563 0.373995ZM42.5002 10.6203L35.9243 19.0628L29.349 10.6203L35.9243 2.17845L42.5002 10.6203Z"
						/>
						<path
							d="M29.8398 21.1777C30.3745 21.0223 30.6022 20.6319 30.348 20.3061L22.8047 10.6199L30.348 0.934844C30.6022 0.60788 30.3745 0.218987 29.8398 0.0631984C29.3037 -0.091436 28.6656 0.0474269 28.4108 0.373621L20.6487 10.3395C20.58 10.4279 20.5453 10.5241 20.5453 10.6199C20.5453 10.7157 20.58 10.8118 20.6487 10.9003L28.4114 20.8673C28.6649 21.1935 29.3044 21.3323 29.8398 21.1777Z"
						/>
						<path
							d="M23.2945 21.1777C23.8305 21.0223 24.0556 20.6319 23.8028 20.3061L16.2595 10.6199L23.8028 0.934844C24.0556 0.60788 23.8305 0.218987 23.2945 0.0631984C22.7591 -0.091436 22.121 0.0474269 21.8656 0.373621L14.1034 10.3395C14.0347 10.4279 14 10.5241 14 10.6199C14 10.7157 14.0347 10.8118 14.1034 10.9003L21.8662 20.8673C22.1197 21.1935 22.7598 21.3323 23.2945 21.1777Z"
						/>
						<path
							d="M16.2945 21.1777C16.8305 21.0223 17.0556 20.6319 16.8028 20.3061L9.25948 10.6199L16.8028 0.934844C17.0556 0.60788 16.8305 0.218987 16.2945 0.0631984C15.7591 -0.091436 15.121 0.0474269 14.8656 0.373621L7.10345 10.3395C7.03471 10.4279 7.00003 10.5241 7.00003 10.6199C7.00003 10.7157 7.03471 10.8118 7.10345 10.9003L14.8662 20.8673C15.1197 21.1935 15.7598 21.3323 16.2945 21.1777Z"
						/>
						<path
							d="M9.2945 21.1777C9.83052 21.0223 10.0556 20.6319 9.80277 20.3061L2.25948 10.6199L9.80277 0.934844C10.0556 0.60788 9.83052 0.218987 9.29451 0.0631984C8.75912 -0.091436 8.12095 0.0474269 7.86556 0.373621L0.103446 10.3395C0.0347104 10.4279 2.62429e-05 10.5241 2.62387e-05 10.6199C2.62345e-05 10.7157 0.0347104 10.8118 0.103446 10.9003L7.86619 20.8673C8.11969 21.1935 8.75975 21.3323 9.2945 21.1777Z"
						/>
					</svg>
				</div>
			</div>
		</div>
	{:else}
		<div class="relative h-[320px] pl-12 flex flex-col">
			<div
				class="relative bg-mz-turquois/70 border border-mz-turquois text-mz-black rounded-lg p-2 flex items-center justify-center font-mono"
			>
				<svg
					class="absolute top-4 -left-10 w-12 h-10 mz_diagram text-mz-purple-400 z-10"
					fill="none"
					stroke="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					stroke-linecap="round"
					stroke-width={5}
				>
					<path d="M6 12 H24" />
					<path d="M18 6 L24 12 L18 18" />
				</svg>
				Network
				<br />
				Egress
			</div>
			<div class="flex-grow" />
			<div
				class="relative bg-mz-turquois/70 text-mz-black border border-mz-turquois rounded-lg p-2 flex items-center justify-center font-mono"
			>
				<svg
					class="absolute top-4 -left-8 w-12 h-10 mz_diagram text-mz-purple-400 z-10"
					fill="none"
					stroke="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					stroke-linecap="round"
					stroke-width={5}
				>
					<path d="M6 12 H24" />
					<path d="M18 6 L24 12 L18 18" />
				</svg>
				Network
				<br />
				Egress
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	/* Diagram Start */
	/* SVG Diagram Styles */
	.mz_diagram .input {
		stroke-dasharray: 10 2;
		stroke-dashoffset: 0;
		animation: dash 700ms linear infinite;
	}
	.mz_diagram .stream1 {
		stroke-dasharray: 10 200 10 50 10 75 10 20 10 5;
		stroke-dashoffset: 0;
		animation: stream 3s linear infinite;
	}
	.mz_diagram .stream2 {
		stroke-dasharray: 10 40 10 90 10 10 10 120 10 90;
		stroke-dashoffset: 50;
		animation: stream 3s linear infinite;
	}
	.mz_diagram .query {
		stroke-dasharray: 48 210;
		animation: query 4s linear infinite;
	}
	.mz_diagram .write {
		stroke-dasharray: 20 250;
		stroke-dashoffset: 60;
		animation: write 11.3s linear infinite;
	}
	.mz_diagram .query-results {
		animation: query-results 4s linear infinite;
	}
	.mz_diagram .subscribe-results {
		animation: subscribe-results 6s linear infinite;
	}
	.mz_diagram .c1 {
		animation: c1 5s linear infinite;
	}
	.mz_diagram .c2 {
		animation: c2 4s linear infinite;
	}
	.mz_diagram .c3 {
		animation: c3 6s linear infinite;
	}
	.mz_diagram .c4 {
		animation: c4 7s linear infinite;
	}
	.mz_diagram .c5 {
		animation: c5 3s linear infinite;
	}
	.mz_diagram .c6 {
		animation: c6 5.5s linear infinite;
	}

	.diagram-block {
		@media (max-width: 840px) {
			@apply transform scale-[.8] -translate-x-8 -mt-10;
		}

		@media (max-width: 680px) {
			@apply scale-[.7] -mt-8;
		}

		@media (max-width: 550px) {
			@apply scale-[.5] -translate-x-6 -mt-16 -mb-24;

			.database {
				@apply -translate-x-24;
			}
		}

		.link {
			&:hover,
			&:focus {
				@apply text-white;
			}
		}
	}
</style>
