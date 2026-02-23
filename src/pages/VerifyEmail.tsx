import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useVerifyEmailMutation } from "@/app/api";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/app/hooks/hooks";
import { useNavigate } from "react-router-dom";

export const VerufyEmail = () => {
	const navigate = useNavigate();
	const [cooldown, setCooldown] = useState(0);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [verifyEmail, { isSuccess, isError, error }] = useVerifyEmailMutation();
	const verifyEmailString = useAppSelector((state) => state.auth.verifyEmail);

	useEffect(() => {
		if (!verifyEmailString) {
			navigate("/signup");
		}
	}, [verifyEmailString]);

	useEffect(() => {
		if (isSuccess) {
			startCooldown(60);
		}
	}, [isSuccess]);
	useEffect(() => {
		startCooldown(60);
	}, []);
	useEffect(() => {
		if (isError) {
			if ("data" in error) {
				const data = error.data as { retry_after?: number };
				if (data.retry_after) {
					setCooldown(data.retry_after);
				}
			}
		}
	}, [isError]);

	const onVerifyEmail = () => {
		if (verifyEmailString) {
			verifyEmail({ email: verifyEmailString });
		}
	};
	function startCooldown(seconds: number) {
		setCooldown(seconds);

		if (timerRef.current) {
			clearInterval(timerRef.current);
		}

		timerRef.current = setInterval(() => {
			setCooldown((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current!);
					timerRef.current = null;
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}
	const getLoginPage = () => {
		navigate("/login");
	};
	return (
		<Box bgcolor={grey[200]} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Container sx={{ display: "flex", justifyContent: "center" }}>
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
					<Typography variant="h5">Регистрация завершена</Typography>
					<Typography variant="subtitle2">Мы отправили письмо для подтверждения email</Typography>
					<Box display="flex" gap={2} alignItems="center">
						<Button disabled={cooldown > 0} variant="outlined" size="medium" onClick={onVerifyEmail}>
							{cooldown > 0 ? `Повтор через ${cooldown} сек` : "Отправить ещё раз"}
						</Button>
						<Button variant="contained" size="medium" onClick={getLoginPage}>
							Войти
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
