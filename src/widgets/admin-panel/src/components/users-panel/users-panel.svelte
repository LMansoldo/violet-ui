<script lang="ts">
	import { Input, Button } from '../../../../../lib/components';
	import { createForm } from 'felte';
	import { quizStore } from '../admin.store';

	const { form, data, isValid } = createForm({
		initialValues: {
			nickname: '',
			name: '',
			email: '',
			phone: ''
		},
		validate: (values) => {
			const errors: any = {};

			if (!values.nickname) {
				errors.total_questions = 'Required';
			}

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.phone) {
				errors.phone = 'Required';
			}

			return errors;
		}
	});

	function handleSubmit(event: any) {
		quizStore.addUsers($data);
		event.target.reset();
	}
</script>

<form use:form on:submit|preventDefault={handleSubmit}>
	<Input label="Nickname" name="nickname" placeholder="Nickname" required={true} />
	<Input label="Nome" name="name" placeholder="Nome" required={true} />
	<Input label="Email" name="email" placeholder="Email" required={true} />
	<Input label="Telefone" name="phone" placeholder="Telefone" required={true} />

	<div class="flex flex-row justify-end py-4">
		<Button type="submit" chip thin disabled={!isValid}>Inserir jogador</Button>
	</div>
</form>
