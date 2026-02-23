type QuestionType = "text" | "single" | "multiple";

type Option = {
	id: string;
	label: string;
};

type Question = {
	id: string;
	type: QuestionType;
	title: string;
	required: boolean;
	description: string;
	placeholder: string;
	minLength?: number;
	maxLength?: number;
	multiline: boolean;
	rows?: number;
	options?: Option[];
};

type FormState = {
	id: string;
	title: string;
	questions: Question[];
};

export type { QuestionType, Option, Question, FormState };
