import { Box, Button, Checkbox, FormControlLabel, IconButton, TextField, Typography } from "@mui/material";
import type { Question } from "../types";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { memo, useState, type KeyboardEvent } from "react";

type Props = {
	question: Question;
	updateTitle: (title: string) => void;
	onDelete: () => void;
	toggleRequired: () => void;
	updateDescription: (id: string, description: string) => void;
};
export const QuestionCard = memo(({ question, updateTitle, onDelete, toggleRequired, updateDescription }: Props) => {
	const [isRead, setIsRead] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>(question.title);

	return (
		<Box border="1px solid #ddd">
			<Box p={3} borderBottom="1px solid #ddd" display="flex" flexDirection="column" gap={1}>
				<Box>
					<Typography mb={1} fontWeight={500}>
						Название:
					</Typography>
					<TextField autoFocus fullWidth onChange={(e) => updateTitle(e.target.value)} />
				</Box>
				<Box display="flex" gap={1} alignItems="center">
					<FormControlLabel control={<Checkbox checked={question.required} onChange={toggleRequired} />} label="Обязательный" />
				</Box>
				<Box>
					<Typography mb={1} fontWeight={500}>
						Описание:
					</Typography>
					<TextField
						label="Описание"
						fullWidth
						value={question.description || ""}
						onChange={(e) => updateDescription(question.id, e.target.value)}
						sx={{ mt: 1 }}
					/>
				</Box>
			</Box>
			<Box p={3}>
				<Typography mb={1} fontWeight={500}>
					Превью
				</Typography>
				<Box sx={{ mt: 1 }}>
					<TextField
						fullWidth
						label={question.title || "Без названия"}
						helperText={question.description || undefined}
						disabled
						required={question.required}
					/>
				</Box>
			</Box>
		</Box>
	);
});
