import { act } from "react";
import type { QuestionType, FormState, Question } from "./types";

type Action =
	| { type: "SET_TITLE"; title: string }
	| {
			type: "ADD_QUESTION";
			id: string;
			questionType: QuestionType;
			title: string;
			required: boolean;
			description: string;
			placeholder: string;
			minLength?: number;
			maxLength?: number;
			multiline: boolean;
			rows?: number;
	  }
	| { type: "REMOVE_QUESTION"; id: string }
	| { type: "UPDATE_QUESTION_TITLE"; id: string; title: string }
	| { type: "TOGGLE_REQUIRED"; id: string }
	| { type: "UPDATE_QUESTION_DESCRIPTION"; id: string; description: string }
	| { type: "UPDATE_QUESTION_PLACEHOLDER"; id: string; placeholder: string }
	| { type: "UPDATE_QUESTION_MINLENGTH"; id: string; minLength: number }
	| { type: "UPDATE_QUESTION_MAXLENGTH"; id: string; maxLength: number }
	| { type: "TOGGLE_IS_MULTILINED"; id: string }
	| { type: "UPDATE_ROWS_LENGTH"; id: string; rows: number };

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
				placeholder: action.placeholder,
				minLength: action.minLength,
				maxLength: action.maxLength,
				multiline: action.multiline,
				rows: action.rows,
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
		case "UPDATE_QUESTION_PLACEHOLDER":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, placeholder: action.placeholder })),
			};
		case "UPDATE_QUESTION_MINLENGTH":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, minLength: action.minLength })),
			};
		case "UPDATE_QUESTION_MAXLENGTH":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, maxLength: action.maxLength })),
			};
		case "TOGGLE_IS_MULTILINED":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, multiline: !q.multiline })),
			};
		case "UPDATE_ROWS_LENGTH":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, rows: action.rows })),
			};
		default:
			return state;
	}
};

const updateQuestions = (questions: Question[], id: string, updater: (g: Question) => Question) =>
	questions.map((q) => (q.id === id ? updater(q) : q));
