import { useReducer } from "react";
import { formReducer } from "./questionsReduser";
import type { FormState, Question, QuestionType } from "./types";

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
	const removeQuestion = (id: string) => {
		dispatch({
			type: "REMOVE_QUESTION",
			id,
		});
	};

	const updateQuestionField = <K extends keyof Question>(id: string, field: K, value: Question[K]) => {
		dispatch({
			type: "UPDATE_QUESTION_FIELD",
			id,
			field,
			value,
		});
	};

	const addOption = (questionId: string) => {
		dispatch({ type: "ADD_OPTION", questionId });
	};

	const updateOptionLabel = (questionId: string, id: string, label: string) => {
		dispatch({ type: "UPDATE_OPTION_LABEL", questionId, id, label });
	};
	const deleteOption = (questionId: string, id: string) => {
		dispatch({ type: "DELETE_OPTION", questionId, id });
	};

	return {
		form: state,
		setTitle,
		addQuestion,
		removeQuestion,
		updateQuestionField,
		addOption,
		updateOptionLabel,
		deleteOption,
	};
};
