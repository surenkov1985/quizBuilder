import { Box, Button, Container, Fade, SvgIcon, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "@/app/api";
import { useEffect } from "react";

type Inputs = {
	email: string;
};

export const ForgotPassword = () => {
	const [forgot, { isLoading, isSuccess }] = useForgotPasswordMutation();
	const data = useForgotPasswordMutation();
	console.log(data);

	useEffect(() => {}, [isSuccess]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	console.log(errors);
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		forgot(data);
	};

	return (
		<Box bgcolor={grey[200]} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Container sx={{ display: "flex", justifyContent: "center" }}>
				<Fade in={!isSuccess} unmountOnExit>
					<Box bgcolor="white" borderRadius={2} sx={{ padding: 3, maxWidth: 550, width: "100%" }}>
						<Typography variant="h5" mb={3}>
							Восстановить пароль
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
							{/* register your input into the hook by invoking the "register" function */}
							<TextField
								error={!!errors.email}
								label="Email"
								autoComplete="false"
								type="text"
								helperText={errors?.email?.message}
								required
								{...register("email", {
									required: "Поле обязательно для заполнения.",
									pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Введите валидный Email" },
								})}
							/>
							{/* {errors.email && <span>{errors?.email.message}</span>} */}
							{/* include validation with required or other standard HTML validation rules */}

							<Button loading={isLoading} type="submit" variant="contained">
								Отправить
							</Button>
						</form>

						<Box marginTop={3} display="flex" gap={2} alignItems="center" justifyContent="space-between">
							<Typography variant="subtitle2">
								<Link className="link" to="/login">
									Авторизация
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
				</Fade>
				<Fade in={isSuccess} unmountOnExit>
					<Box
						bgcolor="white"
						borderRadius={2}
						sx={{ padding: 3, maxWidth: 550, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
					>
						<SvgIcon sx={{ flexGrow: 1, width: 80, height: 80 }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={80} height={80}>
								<path
									fill="#67c23a"
									d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
								></path>
							</svg>
						</SvgIcon>
						<Typography variant="h5">Проверьте почту</Typography>
						<Typography variant="subtitle2">Если email существует, мы отправили письмо</Typography>
					</Box>
				</Fade>
			</Container>
		</Box>
	);
};
