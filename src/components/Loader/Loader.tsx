import { Box, CircularProgress, Container } from "@mui/material";
import { grey } from "@mui/material/colors";

export const Loader = () => {
	return (
		<Box
			bgcolor={grey[100]}
			sx={{ width: "100%", height: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
		>
			<Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
				<CircularProgress color="primary" size="60px" />
			</Box>
		</Box>
	);
};
