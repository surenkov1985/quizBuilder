import { useReducer } from "react";
import { formReducer } from "./questionsReduser";

export const useFormEditor = () => {
	const [state, dispatch] = useReducer(formReducer, {
		id: crypto.randomUUID(),
		title: "",
		questions: [],
	});

	return {
		form: state,
		dispatch,
	};
};
