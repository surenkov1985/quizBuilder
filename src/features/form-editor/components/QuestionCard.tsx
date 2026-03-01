import type { Question } from "../types";
import { memo } from "react";
import { TextQuestionCard } from "./TextQuestionCard";
import { SingleQuestionCard } from "./SingleQuestionCard";

type Props = {
	question: Question;
	onDelete: () => void;
	updateQuestion: (id: string, field: any, value: any) => void;
	addOption: (questionId: string) => void;
	updateOptionLabel: (questionId: string, id: string, label: string) => void;
	deleteOption: (questionId: string, id: string) => void;
};
export const QuestionCard = memo(({ question, onDelete, updateQuestion, addOption, updateOptionLabel, deleteOption }: Props) => {
	switch (question.type) {
		case "text":
			return <TextQuestionCard question={question} onDelete={onDelete} updateQuestion={updateQuestion} />;
		case "single":
			return (
				<SingleQuestionCard
					addOption={addOption}
					question={question}
					onDelete={onDelete}
					updateQuestion={updateQuestion}
					updateOptionLabel={updateOptionLabel}
					deleteOption={deleteOption}
				/>
			);
	}
});
