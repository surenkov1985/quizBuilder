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
		dispatch({ type: "ADD_QUESTION", id: crypto.randomUUID(), questionType, title, required: false, description: "" });
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

	return {
		form: state,
		setTitle,
		addQuestion,
		updateQuestionTitle,
		removeQuestion,
		toggleQuestionRequired,
		updateQuestionDescription,
	};
};
