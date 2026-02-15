import { Box, Button, TextField } from "@mui/material";
import type { Question } from "../types";
import { memo } from "react";

type Props = {
	question: Question;
	updateTitle: (title: string) => void;
	onDelete: () => void;
};
export const QuestionCard = memo(({ question, updateTitle, onDelete }: Props) => {
	return (
		<Box mb={2} p={2} border="1px solid #ddd" borderRadius={2}>
			<TextField fullWidth value={question.title} onChange={(e) => updateTitle(e.target.value)} />

			<Button color="error" onClick={onDelete} sx={{ mt: 1 }}>
				Delete
			</Button>
		</Box>
	);
});
