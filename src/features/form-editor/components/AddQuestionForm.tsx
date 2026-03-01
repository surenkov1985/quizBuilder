import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import type { QuestionType } from "../types";

type Prors = {
	addQuestion: (title: string, type: QuestionType) => void;
};
export const AddQuestionForm = ({ addQuestion }: Prors) => {
	const [title, setTitle] = useState("");
	const [questionType, setQuestionType] = useState<QuestionType>("text");

	const onSubmit = () => {
		addQuestion(title, questionType);
		setTitle("");
	};
	return (
		<Box mb={2} display="flex" gap={1}>
			<TextField label="Вопрос" value={title} onChange={(e) => setTitle(e.target.value)} />
			<Select label="Тип вопроса" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
				<MenuItem value="text">Text</MenuItem>
				<MenuItem value="single">Single</MenuItem>
			</Select>
			<Button variant="outlined" onClick={onSubmit}>
				Добавить вопрос
			</Button>
		</Box>
	);
};
