import { writable } from 'svelte/store';

function createQuizStore() {
	const { subscribe, set, update } = writable(getQuizDataFromLocalStorage());
	function getQuizDataFromLocalStorage() {
		if (typeof localStorage !== 'undefined') {
			const quizData = localStorage.getItem('quizData');
			return quizData ? JSON.parse(quizData) : { questions: [], users: [] };
		} else {
			console.warn('localStorage is not available in this environment');
			return { questions: [], users: [] };
		}
	}

	return {
		subscribe,
		addQuestions: (question: any) =>
			update((quizData) => {
				quizData.questions.push(question);
				return quizData;
			}),
		addUsers: (user: any) =>
			update((quizData) => {
				quizData.users.push(user);
				return quizData;
			}),
		removeQuestion: (questionId: any) => { 
			update((quizData) => {
				quizData.questions = quizData.questions.filter((question: any) => question.id !== questionId);
				return quizData;
			  });
		 },
		returnQuestions: () => getQuizDataFromLocalStorage().questions,
		returnUsers: () => getQuizDataFromLocalStorage().approvals
	};
}

export const quizStore = createQuizStore();
