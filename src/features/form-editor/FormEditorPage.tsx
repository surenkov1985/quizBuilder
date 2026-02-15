import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFormEditor } from "./useFormEditor";
import { QuestionCard } from "./components/QuestionCard";

export const FormEditorPage = () => {
	const { id, formId } = useParams<{ id: string; formId: string }>();
	const { form, dispatch } = useFormEditor();

	if (!id || !formId)
		return (
			<Box>
				<Typography variant="h6">Форма не найдена</Typography>
			</Box>
		);
	console.log(form);
	return (
		<Box maxWidth="800px">
			<Typography mb={2} variant="h6">
				Редактирование формы {formId}
			</Typography>
			<Box mb={2}>
				<TextField label="Название формы" fullWidth />
			</Box>
			<Box>
				<Typography variant="h6" mb={2}>
					Вопросы
				</Typography>
			</Box>
			<Box>
				<TextField label="Form Name" value={form.title} onChange={(e) => dispatch({ type: "SET_TITLE", payload: e.target.value })} />
				<Button
					variant="outlined"
					onClick={() =>
						dispatch({
							type: "ADD_QUESTION",
							payload: { questionType: "text", title: "New Question" },
						})
					}
				>
					Добавить вопрос
				</Button>
			</Box>
			{form.questions.map((q) => {
				return (
					<QuestionCard
						key={q.id}
						question={q}
						updateTitle={(title) =>
							dispatch({
								type: "UPDATE_QUESTION_TITLE",
								payload: { id: q.id, title },
							})
						}
						onDelete={() =>
							dispatch({
								type: "REMOVE_QUESTION",
								payload: { id: q.id },
							})
						}
					/>
				);
			})}
			<Button variant="contained">Добавить вопрос</Button>
		</Box>
	);
};
