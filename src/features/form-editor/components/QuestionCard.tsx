import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import type { Question } from "../types";
import { memo } from "react";

type Props = {
	question: Question;
	updateTitle: (title: string) => void;
	onDelete: () => void;
	toggleRequired: () => void;
	updateDescription: (id: string, description: string) => void;
	updatePlaceholder: (id: string, placeholder: string) => void;
	updateMinLength: (id: string, length: number) => void;
	updateMaxLength: (id: string, length: number) => void;
	toggleIsMultilined: () => void;
	updateRows: (id: string, rows: number) => void;
};
export const QuestionCard = memo(
	({
		question,
		updateTitle,
		toggleRequired,
		updateDescription,
		updatePlaceholder,
		updateMinLength,
		updateMaxLength,
		toggleIsMultilined,
		updateRows,
	}: Props) => {
		return (
			<Box border="1px solid #ddd">
				<Box p={3} borderBottom="1px solid #ddd" display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
					<TextField autoFocus label="Название:" value={question.title} fullWidth onChange={(e) => updateTitle(e.target.value)} />

					<TextField
						label="Описание"
						fullWidth
						value={question.description || ""}
						onChange={(e) => updateDescription(question.id, e.target.value)}
					/>
					<TextField
						label="Placeholder"
						fullWidth
						value={question.placeholder || ""}
						onChange={(e) => updatePlaceholder(question.id, e.target.value)}
						sx={{ mt: 1 }}
					/>
				</Box>
				<Box p={3} borderBottom="1px solid #ddd">
					<Typography mb={1} fontWeight={500}>
						Настройки
					</Typography>
					<Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} alignItems="center" mb={1}>
						<Box>
							<TextField
								fullWidth
								label="Мин. длина"
								type="number"
								value={question.minLength || undefined}
								onChange={(e) => updateMinLength(question.id, Number(e.target.value))}
								sx={{ mt: 1 }}
							/>
						</Box>
						<Box>
							<TextField
								fullWidth
								label="Макс. длина"
								type="number"
								value={question.maxLength || undefined}
								onChange={(e) => updateMaxLength(question.id, Number(e.target.value))}
								sx={{ mt: 1 }}
							/>
						</Box>
					</Box>
					<Box mb={1}>
						<FormControlLabel control={<Checkbox checked={question.multiline} onChange={toggleIsMultilined} />} label="Многострочный" />
						{question.multiline && (
							<Box>
								<TextField
									label="Количество строк:"
									type="number"
									value={question.rows || undefined}
									onChange={(e) => updateRows(question.id, Number(e.target.value))}
									sx={{ mt: 1 }}
								/>
							</Box>
						)}
					</Box>
					<FormControlLabel control={<Checkbox checked={question.required} onChange={toggleRequired} />} label="Обязательный" />
				</Box>
				<Box p={3} bgcolor="#fafafa">
					<Typography mb={1} fontWeight={500}>
						Превью
					</Typography>
					<Box sx={{ mt: 1 }}>
						<TextField
							fullWidth
							label={question.title || "Без названия"}
							placeholder={question.placeholder}
							disabled
							multiline={question.multiline}
							rows={question.rows}
							inputProps={{
								minLength: question.minLength,
								maxLength: question.maxLength,
							}}
							helperText={question.description || undefined}
							required={question.required}
						/>
					</Box>
				</Box>
			</Box>
		);
	},
);
