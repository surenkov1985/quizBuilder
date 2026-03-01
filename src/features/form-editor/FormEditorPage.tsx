import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFormEditor } from "./useFormEditor";
import { QuestionCard } from "./components/QuestionCard";
import { useEffect, useState } from "react";
import { AddQuestionForm } from "./components/AddQuestionForm";
import type { QuestionType } from "./types";

export const FormEditorPage = () => {
	const { id, formId } = useParams<{ id: string; formId: string }>();
	const { form, removeQuestion, setTitle, addQuestion, updateQuestionField, addOption, updateOptionLabel, deleteOption } = useFormEditor();

	const [formTitle, setFormTitle] = useState(form.title);

	useEffect(() => {
		setFormTitle(form.title);
	}, [form.title]);

	if (!id || !formId)
		return (
			<Box>
				<Typography variant="h6">Форма не найдена</Typography>
			</Box>
		);
	const changeFormName = () => {
		if (formTitle.trim()) {
			setTitle(formTitle);
			setFormTitle("");
		}
	};
	const addQuestionHandler = (title: string, type: QuestionType) => {
		if (title.trim()) addQuestion(type, title);
	};
	const updateQuestion = (id: string, field: any, value: any) => {
		updateQuestionField(id, field, value);
	};
	return (
		<Box maxWidth="800px">
			<Typography mb={2} variant="h6">
				Редактирование формы {formId}
			</Typography>
			<Box mb={2} display="flex" gap={2}>
				<TextField value={formTitle} label="Название формы" sx={{ flexGrow: 1 }} onChange={(e) => setFormTitle(e.target.value)} />
				<Button variant="outlined" onClick={changeFormName}>
					Изменить
				</Button>
			</Box>
			<Box>
				<Typography variant="h6" mb={2}>
					Вопросы
				</Typography>
			</Box>
			<Box>
				<AddQuestionForm addQuestion={addQuestionHandler} />
			</Box>
			<Box display="flex" flexDirection="column" gap={3}>
				{form.questions.map((q) => {
					return (
						<QuestionCard
							key={q.id}
							question={q}
							updateQuestion={updateQuestionField}
							onDelete={() => removeQuestion(q.id)}
							addOption={addOption}
							updateOptionLabel={updateOptionLabel}
							deleteOption={deleteOption}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
