import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateFormMutation, useLazyGetFormsQuery } from "@/app/api";
import type { FormState } from "@/features/form-editor/types";

export const ProjectDetail = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [formTitle, setFormTitle] = useState("");
	const navigate = useNavigate();
	const [getForms, { data: forms }] = useLazyGetFormsQuery();
	const [createFormApi, { data }] = useCreateFormMutation();
	useEffect(() => {
		if (id) {
			// const forms
			getForms({ projectId: id });
			console.log(forms);
		}
	}, [id]);

	// const forms = [
	// 	{ id: 1, name: "Registration Form", status: "draft" },
	// 	{ id: 2, name: "Survey 2024", status: "published" },
	// ];

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 150 },
		{ field: "title", headerName: "Name", flex: 1 },
		{ field: "created_at", headerName: "Created", width: 150 },
	];

	const openPopup = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData as any).entries());
		const email = formJson.email;
		console.log(email);
		handleClose();
	};
	const createForm = (title: string): FormState => {
		return {
			id: crypto.randomUUID(),
			title,
			questions: [],
		};
	};
	const addForm = () => {
		if (id) {
			createFormApi({
				projectId: id,
				form: {
					id: crypto.randomUUID(),
					title: formTitle,
					questions: [],
				},
			});
		}
	};
	console.log(data);
	return (
		<Box>
			<Button variant="contained" sx={{ mb: 2 }} onClick={openPopup}>
				Создать форму
			</Button>
			<DataGrid
				rows={forms || []}
				columns={columns}
				autoHeight
				pageSizeOptions={[5, 10, 25]}
				onRowClick={(params) => navigate(`/projects/${id}/forms/${params.id}`)}
				sx={{
					"& .MuiDataGrid-row:hover": {
						cursor: "pointer",
					},
				}}
			/>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Создать форму</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={(theme) => ({
						position: "absolute",
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent>
					{/* <form onSubmit={handleSubmit} id="subscription-form"> */}
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="name"
						label="Название"
						type="text"
						fullWidth
						variant="standard"
						value={formTitle}
						onChange={(e) => setFormTitle(e.target.value)}
					/>
					{/* </form> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={addForm}>Создать</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
