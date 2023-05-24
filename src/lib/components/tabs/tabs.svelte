<script lang="ts">
	import { writable } from 'svelte/store';
	import { createEventDispatcher, onMount, setContext } from 'svelte';
    
	interface TabItem {
		label: string;
		id: string;
	}

	type Events = {
		change: string;
	};

	const dispatch = createEventDispatcher<Events>();
	export let tabs: TabItem[];
	export let selectedTab: string | undefined = tabs[0]?.id;

	const selectedTabCtx = writable<string | undefined>(selectedTab);

	setContext('tabs', selectedTabCtx);

	$: if ($selectedTabCtx !== selectedTab) {
		$selectedTabCtx = selectedTab;
	}

	onMount(
		selectedTabCtx.subscribe((val) => {
			if (selectedTab !== val) selectedTab = val;
		})
	);

	function handleSelectTab(tab: string) {
		selectedTab = tab;
		dispatch('change', tab);
	}
</script>

<div class="tabs">
	{#each tabs as tab}
		<div
			class="tab"
			id="tab.{tab.id}"
			class:selected={tab.id === selectedTab}
			on:click={() => handleSelectTab(tab.id)}
		>
			<slot name="tab" {tab}>{tab.label}</slot>
		</div>
	{/each}
</div>
<slot {selectedTab} />

<style lang="scss">
	.tabs {
		@apply w-full flex flex-row border-additional-300 border-b-2 border-solid;

		.tab {
			@apply text-additional-500 p-4 cursor-pointer hover:bg-primary-50;

			&.selected {
				@apply text-primary-500 border-primary-500 border-b-[2px] border-solid hover:bg-transparent;
			}
		}
	}
</style>
