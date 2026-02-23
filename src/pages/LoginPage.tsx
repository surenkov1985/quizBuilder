import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useLazyMeQuery, useLoginMutation } from "@/app/api";
import { LoginWithSocials } from "@/components/LoginWithSocials/LoginWithSocials";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setAccess, setInited, setUser, setVerifyEmail } from "@/features/auth/authSlice";

type Inputs = {
	email: string;
	password: string;
};
export const LoginPage = () => {
	const [onLogin, { isLoading, isSuccess, isError, error, data }] = useLoginMutation();
	const [meQuery] = useLazyMeQuery();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) {
			meQuery().then((res) => {
				if (res.data) {
					dispatch(setUser(res.data));
					dispatch(setAccess(data.access));
					dispatch(setInited());
					navigate("/");
				}
			});
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
			if ("data" in error) {
				const data = error.data as { error?: string; email?: string };
				if (data.error && data.error === "EMAIL_NOT_VERIFIED") {
					dispatch(setVerifyEmail(data.email!));
					navigate("/verify-email");
				}
			}
		}
	}, [isError]);

	const onSubmit: SubmitHandler<Inputs> = (data) => onLogin(data);
	return (
		<Box bgcolor={grey[200]} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Container sx={{ display: "flex", justifyContent: "center" }}>
				<Box bgcolor="white" borderRadius={2} sx={{ padding: 3, maxWidth: 550, width: "100%" }}>
					<Typography variant="h5" mb={3}>
						Авторизация
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
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
						<TextField
							error={!!errors.password}
							label="Введите пароль"
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

						<Button loading={isLoading} type="submit" variant="contained">
							Войти
						</Button>
					</form>
					<LoginWithSocials />
					<Box marginTop={3} display="flex" gap={2} alignItems="center" justifyContent="space-between">
						<Typography variant="subtitle2">
							Забыли пароль?{" "}
							<Link className="link" to="/forgot-password">
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
