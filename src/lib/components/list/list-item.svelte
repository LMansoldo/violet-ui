<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import Button from '../button/button.svelte';

    type Events = {
		delete: string;
	};

    
    export let questionData: any = {}
    
	const dispatch = createEventDispatcher<Events>();
    let { question, answers, correct_answer, id } = questionData

	let selected: string | undefined = undefined;
	let labelButton: string = 'Visualizar respostas';

	$: selected;
	$: labelButton = 'Visualizar respostas';

	function handleAnswersVisualization() {
		selected = selected !== id ? id : undefined;
		labelButton = selected !== id ? 'Visualizar respostas' : 'Ocultar respostas';
	}

    function handleQuestionDelete() {
        console.log(id)
        dispatch("delete", id)
    }
</script>

<div
	class="flex flex-col border-additional-50 border-solid border-b-additional-200 border-b-2 py-4 px-3 w-full gap-4"
>
	<h1>{question}</h1>
	{#if id === selected}
		<div transition:slide={{ delay: 0 }} class="flex flex-col bg-white gap-2">
			{#each answers as answer}
				<span class="px-2">{answer}</span>
			{/each}
			<span class="px-2">R: {correct_answer}</span>
		</div>
	{/if}
	<div class="flex flex-row justify-end gap-4">
		<Button thin variant="outlined" on:click={() => handleAnswersVisualization()}>
			{labelButton}
		</Button>
		<Button thin variant="outlined" on:click={() => handleQuestionDelete()}>Excluir pergunta</Button>
	</div>
</div>
