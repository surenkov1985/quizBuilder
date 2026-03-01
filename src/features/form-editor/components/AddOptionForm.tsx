import { Box, Button } from "@mui/material";

type Prors = {
	addOption: () => void;
};
export const AddOptionForm = ({ addOption }: Prors) => {
	return (
		<Box mb={2} display="flex" gap={1}>
			<Button variant="outlined" onClick={addOption}>
				Добавить вариант
			</Button>
		</Box>
	);
};
