<script lang="ts">
	import { Input, Button } from '../../../../../lib/components';
	import { createForm } from 'felte';
	import getQuestions from '../../services/api';
	import { quizStore } from '../admin.store';
	import { onMount } from 'svelte';

	onMount(() =>
		quizStore.subscribe((quizData) => {
			localStorage.setItem('quizData', JSON.stringify(quizData));
		})
	);

	let isLoading = false

	const { form, errors, data, isValid } = createForm({
		initialValues: {
			total_questions: '',
			options: '',
			theme: ''
		},
		validate: (values) => {
			const errors: any = {};

			if (!values.total_questions) {
				errors.total_questions = 'Required';
			}

			if (!values.options) {
				errors.options = 'Required';
			}

			if (!values.theme) {
				errors.options = 'Required';
			}

			return errors;
		}
	});

	async function setQuestionsData(data: any) {
		isLoading = true;
		const prompt = `Crie ${data.total_questions} questoes nao enumeradas com ${data.options} opcoes sendo uma verdadeira sobre ${data.theme} e devolva em um objeto de json minificado. O retorno devera ser um array com { id: UUID (randomico), question: string, answers: string[], correct_answer: string }`;
		await getQuestions(prompt);
		isLoading = false;
	}

	function handleSubmit(event: any) {
		setQuestionsData($data);
		event.target.reset();
	}
</script>

<form use:form on:submit|preventDefault={handleSubmit}>
	<Input
		label="Total de Perguntas"
		name="total_questions"
		placeholder="Total de Perguntas"
		required={true}
	/>

	<Input
		label="Total de Alternativas"
		name="options"
		placeholder="Total de Alternativas"
		required={true}
	/>

	<Input label="Tema das Perguntas" name="theme" placeholder="Tema das Perguntas" required={true} />

	<div class="flex flex-row justify-end py-4">
		<Button type="submit" chip thin disabled={!isValid} {isLoading}>Gerar</Button>
	</div>
</form>
