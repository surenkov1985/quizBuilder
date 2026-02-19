import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import type { Question } from "../types";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { memo, useState, type KeyboardEvent } from "react";

type Props = {
	question: Question;
	updateTitle: (title: string) => void;
	onDelete: () => void;
};
export const QuestionCard = memo(({ question, updateTitle, onDelete }: Props) => {
	const [isRead, setIsRead] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>(question.title);

	const onUpdateTitle = () => {
		updateTitle(newTitle);
		setIsRead(false);
	};
	const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") {
			onUpdateTitle();
		}
	};
	return (
		<Box mb={2} p={2} border="1px solid #ddd" display="flex" borderRadius={2}>
			{isRead ? (
				<>
					<TextField autoFocus fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={onPressEnter} />

					<IconButton onClick={onUpdateTitle} color="success">
						<DoneIcon />
					</IconButton>
				</>
			) : (
				<>
					<Button variant="text" onDoubleClick={() => setIsRead(true)}>
						<Typography variant="body2">{newTitle}</Typography>
					</Button>
					<IconButton onClick={onDelete} color="error">
						<CloseIcon />
					</IconButton>
				</>
			)}
		</Box>
	);
});
