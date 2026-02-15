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
	options?: Option[];
};

type FormState = {
	id: string;
	title: string;
	questions: Question[];
};

export { type QuestionType, type Option, type Question, type FormState };
