<script lang="ts">
	import { Section, Aside, Header, Tabs, TabContent } from '../../../../lib/components';
	import QuestionsPanel from './questions-panel/questions-panel.svelte';
	import UsersPanel from './users-panel/users-panel.svelte';
	import MainSection from './main-section/main-section.svelte';
	import { quizStore } from './admin.store';
	import { createEventDispatcher } from 'svelte';

	interface TabItem {
		label: string;
		id: string;
	}
    
    type Events = {
		change: string
		newPayment: void
	}
	const MAIN_TABS = ['Usuarios', 'Perguntas']
	const dispatch = createEventDispatcher<Events>()
	export let tab: string | undefined = 'Perguntas';
	let tabs: TabItem[] = MAIN_TABS.map((id) => ({
		id,
		label: id
	}));

    function handleChangeTab(e: CustomEvent<string>) {
		dispatch('change', e.detail)
	}
</script>

<div class="flex flex-col gap-4">
	<Header title="Trivia" />
	<div class="flex flex-row gap-4">
		<Section>
			<MainSection />
		</Section>
		<Aside>
			<Tabs selectedTab={tab} {tabs} on:change={handleChangeTab}>
				<TabContent id="Usuarios">
					<div class="py-8">
						<UsersPanel />
					</div>
				</TabContent>
				<TabContent id="Perguntas">
					<div class="py-8">
						<QuestionsPanel />
					</div>
				</TabContent>
			</Tabs>
		</Aside>
	</div>
</div>


