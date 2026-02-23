import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export const ProjectDetail = () => {
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const forms = [
		{ id: 1, name: "Registration Form", status: "draft" },
		{ id: 2, name: "Survey 2024", status: "published" },
	];

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "status", headerName: "Status", width: 150 },
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
					<form onSubmit={handleSubmit} id="subscription-form">
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
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						type="submit"
						form="subscription-form"
						onClick={(e) => {
							console.log(e);
						}}
					>
						Создать
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
