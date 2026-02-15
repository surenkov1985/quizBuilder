import { useAppSelector } from "@/app/hooks/hooks";
import { Box, Typography } from "@mui/material";

export const ProfilePage = () => {
	const user = useAppSelector((state) => state.auth.user);

	if (!user) return null;

	return (
		<Box>
			<Typography variant="h4">Привет {user.name}</Typography>
		</Box>
	);
};
