import { Box, Button, Container, FormControl, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { IoLogoGoogle } from "react-icons/io";
import { FaYandex } from "react-icons/fa";
import { Link } from "react-router-dom";

type Inputs = {
	email: string;
	password: string;
};
export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	console.log(watch("email"));
	return (
		<Box bgcolor={grey[200]} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Container sx={{ display: "flex", justifyContent: "center" }}>
				<Box bgcolor="white" borderRadius={2} sx={{ padding: 3, maxWidth: 550, width: "100%" }}>
					<Typography variant="h5" mb={3}>
						Авторизация
					</Typography>
					<FormControl onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", display: "flex", direction: "column", gap: 3 }}>
						{/* register your input into the hook by invoking the "register" function */}
						<TextField
							error={!!errors.email}
							label="Email"
							autoComplete="false"
							type="email"
							required
							{...register("email", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/ })}
						/>
						{errors.email && <span>This field is required</span>}
						{/* include validation with required or other standard HTML validation rules */}
						<TextField type="password" label="Password" autoComplete="false" {...register("password", { required: true })} />
						{/* errors will return when field validation fails  */}
						{errors.password && <span>This field is required</span>}

						<Button type="submit" variant="contained">
							Войти
						</Button>
					</FormControl>
					<Box marginTop={3} display="flex" gap={2} alignItems="center">
						<Typography variant="subtitle2" component="p">
							Войти с помощью:
						</Typography>
						<Button variant="outlined" size="medium">
							<IoLogoGoogle size={24} />
						</Button>
						<Button variant="outlined" size="medium">
							<FaYandex size={24} />
						</Button>
					</Box>
					<Box marginTop={3} display="flex" gap={2} alignItems="center" justifyContent="space-between">
						<Typography variant="subtitle2">
							Забыли пароль?{" "}
							<Link className="link" to="/signup">
								Восстановить
							</Link>
						</Typography>
						<Typography variant="subtitle2">
							Нет аккаунта?{" "}
							<Link className="link" to="/signup">
								Зарегистрироваться
							</Link>
						</Typography>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
