<script lang="ts">
	import { getContext } from 'svelte'
	import type { Readable } from 'svelte/store'

	export let id: string

	const selectedTabCtx: Readable<string | undefined> = getContext('tabs')
</script>

{#if $selectedTabCtx === id}
	<slot />
{/if}
