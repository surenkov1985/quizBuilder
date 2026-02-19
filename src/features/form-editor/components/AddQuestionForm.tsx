import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Prors = {
	addQuestion: (title: string) => void;
};
export const AddQuestionForm = ({ addQuestion }: Prors) => {
	const [title, setTitle] = useState("");

	const onSubmit = () => {
		addQuestion(title);
		setTitle("");
	};
	return (
		<Box mb={2} display="flex" gap={1}>
			<TextField label="Вопрос" value={title} onChange={(e) => setTitle(e.target.value)} />
			<Button variant="outlined" onClick={onSubmit}>
				Добавить вопрос
			</Button>
		</Box>
	);
};
