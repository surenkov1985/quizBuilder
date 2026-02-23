import { useReducer } from "react";
import { formReducer } from "./questionsReduser";
import type { FormState, QuestionType } from "./types";

const initialFormState: FormState = {
	id: crypto.randomUUID(),
	title: "",
	questions: [],
};

export const useFormEditor = () => {
	const [state, dispatch] = useReducer(formReducer, { ...initialFormState });

	const setTitle = (title: string) => {
		dispatch({ type: "SET_TITLE", title });
	};
	const addQuestion = (questionType: QuestionType, title: string) => {
		dispatch({
			type: "ADD_QUESTION",
			id: crypto.randomUUID(),
			questionType,
			title,
			required: false,
			description: "",
			placeholder: "",
			multiline: false,
		});
	};
	const updateQuestionTitle = (id: string, title: string) => {
		dispatch({
			type: "UPDATE_QUESTION_TITLE",
			id,
			title,
		});
	};
	const removeQuestion = (id: string) => {
		dispatch({
			type: "REMOVE_QUESTION",
			id,
		});
	};

	const toggleQuestionRequired = (id: string) => {
		dispatch({
			type: "TOGGLE_REQUIRED",
			id,
		});
	};

	const updateQuestionDescription = (id: string, description: string) => {
		dispatch({
			type: "UPDATE_QUESTION_DESCRIPTION",
			id,
			description,
		});
	};

	const updateQuestionPlaceholder = (id: string, placeholder: string) => {
		dispatch({
			type: "UPDATE_QUESTION_PLACEHOLDER",
			id,
			placeholder,
		});
	};

	const updateQuestionMinlength = (id: string, minLength: number) => {
		dispatch({
			type: "UPDATE_QUESTION_MINLENGTH",
			id,
			minLength,
		});
	};

	const updateQuestionMaxlength = (id: string, maxLength: number) => {
		dispatch({
			type: "UPDATE_QUESTION_MAXLENGTH",
			id,
			maxLength,
		});
	};

	const toggleIsMultilinedQuestion = (id: string) => {
		dispatch({
			type: "TOGGLE_IS_MULTILINED",
			id,
		});
	};

	const updateQuestionRows = (id: string, rows: number) => {
		dispatch({
			type: "UPDATE_ROWS_LENGTH",
			id,
			rows,
		});
	};

	return {
		form: state,
		setTitle,
		addQuestion,
		updateQuestionTitle,
		removeQuestion,
		toggleQuestionRequired,
		updateQuestionDescription,
		updateQuestionPlaceholder,
		updateQuestionMinlength,
		updateQuestionMaxlength,
		toggleIsMultilinedQuestion,
		updateQuestionRows,
	};
};
