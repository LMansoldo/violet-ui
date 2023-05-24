<script lang="ts">
	import { clsx } from 'clsx'

	export let label: string;
	export let name: string
	export let placeholder: string;
	export let type: 'text' | 'email' | 'number' = 'text';
	export let required: boolean = false;
	export let disabled: boolean = false;

    $: className = clsx('mt-1 focus:border-primary-300 focus:border-1 border-2 block w-full bg-white sm:text-sm border-gray-300 border-solid rounded-md min-h-[3rem] px-4 outline-none', $$props.class)

</script>

<div>
	{#if label}
		<label class="block text-sm font-medium text-gray-700 " for={$$props.id || 0}>
			{label}
			{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</label>
	{/if}
	<input {type} {placeholder} class={className} {name} {disabled} {...$$props} />
</div>
