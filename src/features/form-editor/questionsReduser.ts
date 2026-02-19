import type { QuestionType, FormState, Question } from "./types";

type Action =
	| { type: "SET_TITLE"; title: string }
	| { type: "ADD_QUESTION"; id: string; questionType: QuestionType; title: string }
	| { type: "REMOVE_QUESTION"; id: string }
	| { type: "UPDATE_QUESTION_TITLE"; id: string; title: string };

export const formReducer = (state: FormState, action: Action): FormState => {
	switch (action.type) {
		case "SET_TITLE":
			return {
				...state,
				title: action.title,
			};

		case "ADD_QUESTION":
			const newQuestion = {
				id: crypto.randomUUID(),
				type: action.questionType,
				title: action.title,
				required: false,
				...(action.questionType !== "text" && {
					options: [{ id: action.id, label: "Option 1" }],
				}),
			};
			return {
				...state,
				questions: [...state.questions, newQuestion],
			};

		case "REMOVE_QUESTION":
			return {
				...state,
				questions: state.questions.filter((q) => q.id !== action.id),
			};

		case "UPDATE_QUESTION_TITLE":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, title: action.title })),
			};
		default:
			return state;
	}
};

const updateQuestions = (questions: Question[], id: string, updater: (g: Question) => Question) =>
	questions.map((q) => (q.id === id ? updater(q) : q));
