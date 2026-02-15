import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<Box width="100%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
			<Typography variant="h1" textAlign="center" mb={3}>
				404
			</Typography>
			<Typography variant="h4" textAlign="center" mb={2}>
				Страница не найдена
			</Typography>
			<Button variant="contained" onClick={() => navigate("/")}>
				На главную
			</Button>
		</Box>
	);
};
