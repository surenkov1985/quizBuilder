import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { SingleQuestion } from "../types";
import { AddOptionForm } from "./AddOptionForm";
import { useState } from "react";

type Props = {
	question: SingleQuestion;
	onDelete: () => void;
	updateQuestion: (id: string, field: any, value: any) => void;
	addOption: (questionId: string) => void;
	updateOptionLabel: (questionId: string, id: string, label: string) => void;
	deleteOption: (questionId: string, id: string) => void;
};

export const SingleQuestionCard = ({ question, onDelete, updateQuestion, addOption, updateOptionLabel, deleteOption }: Props) => {
	const [questionValue, setQuestionValue] = useState("");
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
					</Box>
					<Box p={3} borderBottom="1px solid #ddd">
						<Typography mb={1} fontWeight={500}>
							Настройки
						</Typography>
						<FormControlLabel
							control={
								<Checkbox checked={question.required} onChange={() => updateQuestion(question.id, "required", !question.required)} />
							}
							label="Обязательный"
						/>
					</Box>
					<Box p={3} borderBottom="1px solid #ddd">
						<Typography mb={1} fontWeight={500}>
							Варианты ответов
						</Typography>
						<AddOptionForm addOption={() => addOption(question.id)} />
						<Box display="flex" flexDirection="column" gap={1}>
							{question.options &&
								question.options.map((option) => {
									return (
										<Box display="flex" alignItems="center" gap={1}>
											<TextField
												key={option.id}
												fullWidth
												autoFocus
												value={option.label}
												onChange={(e) => updateOptionLabel(question.id, option.id, e.target.value)}
											/>
											<Button variant="text" color="error" onClick={() => deleteOption(question.id, option.id)}>
												<DeleteForeverOutlinedIcon />
											</Button>
										</Box>
									);
								})}
						</Box>
					</Box>
					<Box p={3} bgcolor="#fafafa">
						<Typography mb={1} fontWeight={500}>
							Превью
						</Typography>
						<Box sx={{ mt: 1 }}>
							<Select fullWidth value={questionValue} displayEmpty onChange={(e) => setQuestionValue(e.target.value)}>
								<MenuItem value="">Выберите значение</MenuItem>
								{question.options &&
									question.options.map((option) => {
										return (
											<MenuItem key={option.id} value={option.label.toLowerCase()}>
												{option.label}
											</MenuItem>
										);
									})}
							</Select>
						</Box>
					</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};
