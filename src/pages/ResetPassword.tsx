import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/app/api";
import { useEffect } from "react";

type Inputs = {
	password: string;
	confirmPassword: string;
};

export const ResetPassword = () => {
	const navigate = useNavigate();
	const [reset, { isLoading, isSuccess }] = useResetPasswordMutation();
	const [params] = useSearchParams();
	console.log(params);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const token = params.get("token");
		if (token) reset({ ...data, token });
	};

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				navigate("/login");
			}, 1500);
		}
	}, [isSuccess]);

	return (
		<Box bgcolor={grey[200]} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Container sx={{ display: "flex", justifyContent: "center" }}>
				<Box bgcolor="white" borderRadius={2} sx={{ padding: 3, maxWidth: 550, width: "100%" }}>
					<Typography variant="h5" mb={3}>
						Сброс пароля
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
						{/* register your input into the hook by invoking the "register" function */}
						<TextField
							error={!!errors.password}
							label="Введите новый пароль"
							autoComplete="false"
							type="password"
							helperText={errors?.password?.message}
							required
							{...register("password", {
								required: "Поле обязательно для заполнения.",
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
									message: "Пароль должен содержать строчные буквы, заглавные буквы, цифры, символы",
								},
							})}
						/>
						<TextField
							error={!!errors.confirmPassword}
							label="Подтвердите пароль"
							autoComplete="false"
							type="password"
							helperText={errors?.confirmPassword?.message}
							required
							{...register("confirmPassword", {
								required: "Поле обязательно для заполнения.",
								validate: (val: string) => {
									const { password } = getValues();

									console.log(password, val);
									if (password !== val) {
										return "Пароли не совпадают";
									}
								},
							})}
						/>

						<Button type="submit" loading={isLoading} variant="contained">
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
			</Container>
		</Box>
	);
};
