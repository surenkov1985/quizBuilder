import type { QuestionType, FormState, Question } from "./types";

type Action =
	| { type: "SET_TITLE"; title: string }
	| { type: "ADD_QUESTION"; id: string; questionType: QuestionType; title: string; required: boolean; description: string }
	| { type: "REMOVE_QUESTION"; id: string }
	| { type: "UPDATE_QUESTION_TITLE"; id: string; title: string }
	| { type: "TOGGLE_REQUIRED"; id: string }
	| { type: "UPDATE_QUESTION_DESCRIPTION"; id: string; description: string };

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
				required: action.required,
				description: action.description,
				...(action.questionType !== "text" && {
					options: [{ id: action.id, label: "Question", required: false }],
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
		case "TOGGLE_REQUIRED":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, required: !q.required })),
			};
		case "UPDATE_QUESTION_DESCRIPTION":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, description: action.description })),
			};
		default:
			return state;
	}
};

const updateQuestions = (questions: Question[], id: string, updater: (g: Question) => Question) =>
	questions.map((q) => (q.id === id ? updater(q) : q));
