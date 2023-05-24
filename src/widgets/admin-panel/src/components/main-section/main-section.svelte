<script lang="ts">
	import { quizStore } from '../admin.store';
	import { List, ListItem } from '$violet/components';
	import { onMount } from 'svelte';

	$: questions = $quizStore.questions;

	function handleQuestionDelete(event: CustomEvent) {
		quizStore.removeQuestion(event.detail);
		questions = quizStore.returnQuestions();
	}
	
	onMount(() => {
		quizStore.subscribe((quizData) => {
			localStorage.setItem('quizData', JSON.stringify(quizData));
		});
	});
	

</script>

<List>
	{#each questions as question}
		<ListItem questionData={question} on:delete={handleQuestionDelete} />
	{/each}
</List>
