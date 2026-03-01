import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { TextQuestion } from "../types";

type Props = {
	question: TextQuestion;
	onDelete: () => void;
	updateQuestion: (id: string, field: any, value: any) => void;
};

export const TextQuestionCard = ({ question, updateQuestion }: Props) => {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
				<Typography variant="h6">{question.title}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box border="1px solid #ddd">
					<Box p={3} borderBottom="1px solid #ddd" display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
						<TextField
							autoFocus
							label="Название:"
							value={question.title}
							fullWidth
							onChange={(e) => updateQuestion(question.id, "title", e.target.value)}
						/>

						<TextField
							label="Описание"
							fullWidth
							value={question.description || ""}
							onChange={(e) => updateQuestion(question.id, "description", e.target.value)}
						/>
						<TextField
							label="Placeholder"
							fullWidth
							value={question.placeholder || ""}
							onChange={(e) => updateQuestion(question.id, "placeholder", e.target.value)}
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
									onChange={(e) => updateQuestion(question.id, "minLength", Number(e.target.value))}
									sx={{ mt: 1 }}
								/>
							</Box>
							<Box>
								<TextField
									fullWidth
									label="Макс. длина"
									type="number"
									value={question.maxLength || undefined}
									onChange={(e) => updateQuestion(question.id, "maxLength", Number(e.target.value))}
									sx={{ mt: 1 }}
								/>
							</Box>
						</Box>
						<Box mb={1}>
							<FormControlLabel
								control={
									<Checkbox
										checked={question.multiline}
										onChange={(e) => updateQuestion(question.id, "multiline", !question.multiline)}
									/>
								}
								label="Многострочный"
							/>
							{question.multiline && (
								<Box>
									<TextField
										label="Количество строк:"
										type="number"
										value={question.rows || undefined}
										onChange={(e) => updateQuestion(question.id, "rows", Number(e.target.value))}
										sx={{ mt: 1 }}
									/>
								</Box>
							)}
						</Box>
						<FormControlLabel
							control={
								<Checkbox checked={question.required} onChange={() => updateQuestion(question.id, "required", !question.required)} />
							}
							label="Обязательный"
						/>
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
			</AccordionDetails>
		</Accordion>
	);
};
