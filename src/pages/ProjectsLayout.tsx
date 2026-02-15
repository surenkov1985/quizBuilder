import { Box, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

export const ProjectsLayout = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<Box>
			<Typography variant="h4" marginBottom={2}>
				Проект {id}
			</Typography>
			<Outlet />
		</Box>
	);
};
