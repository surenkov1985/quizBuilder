import type { QuestionType, FormState } from "./types";

type Action =
	| { type: "SET_TITLE"; payload: string }
	| { type: "ADD_QUESTION"; payload: { questionType: QuestionType; title: string } }
	| { type: "REMOVE_QUESTION"; payload: { id: string } }
	| { type: "UPDATE_QUESTION_TITLE"; payload: { id: string; title: string } };

export const formReducer = (state: FormState, action: Action): FormState => {
	switch (action.type) {
		case "SET_TITLE":
			return {
				...state,
				title: action.payload,
			};

		case "ADD_QUESTION":
			const newQuestion = {
				id: crypto.randomUUID(),
				type: action.payload.questionType,
				title: action.payload.title,
				required: false,
				...(action.payload.questionType !== "text" && {
					options: [{ id: crypto.randomUUID(), label: "Option 1" }],
				}),
			};
			return {
				...state,
				questions: [...state.questions, newQuestion],
			};

		case "REMOVE_QUESTION":
			return {
				...state,
				questions: state.questions.filter((q) => q.id !== action.payload.id),
			};

		case "UPDATE_QUESTION_TITLE":
			return {
				...state,
				questions: state.questions.map((q) => (q.id === action.payload.id ? { ...q, title: action.payload.title } : q)),
			};
		default:
			return state;
	}
};
