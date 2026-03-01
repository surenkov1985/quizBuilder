import type { QuestionType, FormState, Question } from "./types";

type UpdateQuestionFieldAction<K extends keyof Question = keyof Question> = {
	type: "UPDATE_QUESTION_FIELD";
	id: string;
	field: K;
	value: Question[K];
};

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
	| UpdateQuestionFieldAction
	| { type: "ADD_OPTION"; questionId: string }
	| { type: "UPDATE_OPTION_LABEL"; questionId: string; id: string; label: string }
	| { type: "DELETE_OPTION"; questionId: string; id: string };

export const formReducer = (state: FormState, action: Action): FormState => {
	switch (action.type) {
		case "SET_TITLE":
			return {
				...state,
				title: action.title,
			};

		case "ADD_QUESTION":
			let newQuestion: Question;

			if (action.questionType === "text") {
				newQuestion = {
					id: crypto.randomUUID(),
					type: "text",
					title: action.title,
					required: false,
					description: "",
					placeholder: "",
					multiline: false,
					minLength: undefined,
					maxLength: undefined,
					rows: undefined,
				};
			} else {
				newQuestion = {
					id: crypto.randomUUID(),
					type: "single",
					title: action.title,
					required: false,
					description: "",
					options: [{ id: crypto.randomUUID(), label: "Option" }],
				};
			}
			// const newQuestion = {
			// 	id: crypto.randomUUID(),
			// 	type: action.questionType,
			// 	title: action.title,
			// 	required: action.required,
			// 	description: action.description,
			// 	placeholder: action.placeholder,
			// 	minLength: action.minLength,
			// 	maxLength: action.maxLength,
			// 	multiline: action.multiline,
			// 	rows: action.rows,
			// 	...(action.questionType !== "text" && {
			// 		options: [{ id: action.id, label: "Question", required: false }],
			// 	}),
			// };
			return {
				...state,
				questions: [...state.questions, newQuestion],
			};

		case "REMOVE_QUESTION":
			return {
				...state,
				questions: state.questions.filter((q) => q.id !== action.id),
			};
		case "UPDATE_QUESTION_FIELD":
			return {
				...state,
				questions: updateQuestions(state.questions, action.id, (q) => ({ ...q, [action.field]: action.value })),
			};
		case "ADD_OPTION":
			return {
				...state,
				questions: state.questions.map((q) => {
					if (q.id !== action.questionId) return q;
					if (q.type === "single") {
						return {
							...q,
							options: [...q.options, { id: crypto.randomUUID(), label: "" }],
						};
					}
					return q;
				}),
			};
		case "UPDATE_OPTION_LABEL":
			return {
				...state,
				questions: state.questions.map((q) => {
					if (q.id !== action.questionId) return q;
					if (q.type === "single") {
						return {
							...q,
							options: q.options.map((opt) => {
								if (opt.id === action.id)
									return {
										...opt,
										label: action.label,
									};
								return opt;
							}),
						};
					}
					return q;
				}),
			};
		case "DELETE_OPTION":
			return {
				...state,
				questions: state.questions.map((q) => {
					if (q.id !== action.questionId) return q;
					if (q.type === "single") {
						return {
							...q,
							options: q.options.filter((opt) => {
								if (q.options.length <= 1) return q;
								return opt.id !== action.id;
							}),
						};
					}
					return q;
				}),
			};
		default:
			return state;
	}
};

const updateQuestions = (questions: Question[], id: string, updater: (g: Question) => Question) =>
	questions.map((q) => (q.id === id ? updater(q) : q));
