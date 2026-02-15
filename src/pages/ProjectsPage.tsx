import { useProjectsQuery } from "@/app/api";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/app/types";

export const ProjectsPage = () => {
	const { data, isLoading, error } = useProjectsQuery();
	const [open, setOpen] = useState(false);

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

	if (isLoading) {
		return (
			<Box display="flex" justifyContent="center" mt={4}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box mt={4}>
				<Alert severity="error">Ошибка загрузки проектов</Alert>
			</Box>
		);
	}

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 90 },
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "domain", headerName: "Domain", flex: 1 },
		{ field: "status", headerName: "Status", flex: 1 },
		{ field: "created_at", headerName: "Created", flex: 1 },
	];

	return (
		<Box>
			<Button variant="contained" sx={{ mb: 2 }} onClick={openPopup}>
				Создать проект
			</Button>

			<MemoGrid data={data} columns={columns} />
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Создать проект</DialogTitle>
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
					<Button type="submit" form="subscription-form">
						Создать
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

const MemoGrid = React.memo(function Grid({ data, columns }: { data: Project[] | undefined; columns: GridColDef[] }) {
	const navigate = useNavigate();
	return (
		<DataGrid
			rows={data || []}
			columns={columns}
			autoHeight
			pageSizeOptions={[5, 10, 25]}
			onRowClick={(params) => navigate(`/projects/${params.id}`)}
			sx={{
				"& .MuiDataGrid-row:hover": {
					cursor: "pointer",
				},
			}}
		/>
	);
});
