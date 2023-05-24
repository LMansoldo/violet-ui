<script lang="ts">
	import { clsx } from 'clsx';

	export let variant: 'contained' | 'outlined' | 'text' = 'text';
	export let chip = true;
	export let thin = false;
	export let color: 'primary' | 'secondary' = 'primary';
	export let isLoading: boolean = false;

	let button: HTMLButtonElement | HTMLAnchorElement;

	export const getElement = () => button;

	$: className = clsx('btn relative', variant, color, { chip, thin }, $$props.class);
	$: slotClass = isLoading ? 'text-transparent' : ''

</script>

{#if $$props.href}
	<a
		{...$$restProps}
		data-testid={$$props['data-testid']}
		href={$$props.href}
		bind:this={button}
		class={className}
		class:disabled={$$props.disabled}
		on:click
	>
		<slot />
	</a>
{:else}
	<button
		{...$$restProps}
		bind:this={button}
		class={clsx(className)}
		data-testid={$$props['data-testid']}
		class:disabled={isLoading || $$props.disabled}
		on:click
	>
		{#if isLoading}
			<div class="absolute inset-0 flex items-center justify-center mx-1">
				<svg
					class="animate-spin h-5 w-5 text-primary-200"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c7.627 0 13-5.373 13-12h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
					/>
				</svg>
			</div>
	
		{/if}
		<div class={slotClass}>
			<slot />
		</div>
	</button>
{/if}
