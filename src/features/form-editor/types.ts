type QuestionType = "text" | "single";

type Option = {
	id: string;
	label: string;
};

type TextQuestion = BaseQuestion & {
	type: "text";
	placeholder: string;
	minLength?: number;
	maxLength?: number;
	multiline: boolean;
	rows?: number;
};

type SingleQuestion = BaseQuestion & {
	type: "single";
	options: Option[];
};

type BaseQuestion = {
	id: string;
	title: string;
	required: boolean;
	description: string;
};

type Question = TextQuestion | SingleQuestion;

type FormState = {
	id: string;
	title: string;
	questions: Question[];
};

export type { QuestionType, Option, TextQuestion, SingleQuestion, Question, FormState };
