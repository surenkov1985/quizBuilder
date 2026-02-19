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
		dispatch({ type: "ADD_QUESTION", id: crypto.randomUUID(), questionType, title });
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

	return {
		form: state,
		setTitle,
		addQuestion,
		updateQuestionTitle,
		removeQuestion,
	};
};
