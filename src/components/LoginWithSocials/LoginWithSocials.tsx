import { Box, Button, Typography } from "@mui/material";
import { IoLogoGoogle } from "react-icons/io";
import { FaYandex } from "react-icons/fa";
import { FaVk } from "react-icons/fa";
import { generateCodeChallenge, generateCodeVerifier } from "@/shared/api/utils";

export const LoginWithSocials = () => {
	const loginGoogle = () => {
		const params = {
			client_id: "800428011914-ds1pf34d72cqu323qnakuhuvm09hrjah.apps.googleusercontent.com",
			redirect_uri: "https://mich-man.ru/api/auth_google",
			response_type: "code",
			scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
			state: "123",
		};

		const url = "https://accounts.google.com/o/oauth2/auth?" + new URLSearchParams(params);

		window.location.href = url; // редирект
	};

	const loginYandex = () => {
		const params = {
			client_id: "1d02c410b93b436694958bf94c2632b8",
			redirect_uri: "https://mich-man.ru/api/ya_auth",
			response_type: "code",
			state: "123",
		};

		const url = "https://oauth.yandex.ru/authorize?" + new URLSearchParams(params);
		window.location.href = url;
	};

	const loginVk = async () => {
		const state = crypto.randomUUID();

		const codeVerifier = generateCodeVerifier();
		const codeChallenge = await generateCodeChallenge(codeVerifier);
		// сохраняешь его в cookie (обязательно!)
		document.cookie = `vk_code_verifier=${codeVerifier}; ` + `path=/; Secure; SameSite=None`;
		// сохраняем verifier (важно!)
		sessionStorage.setItem("vk_code_verifier", codeVerifier);
		sessionStorage.setItem("vk_state", state);

		const params = {
			client_id: "54353967",
			redirect_uri: "https://mich-man.ru/oauth/callback/vk",
			response_type: "code",
			scope: "email",
			state: state,
			code_challenge: codeChallenge,
			code_challenge_method: "S256",
		};

		const url = "https://id.vk.ru/authorize?" + new URLSearchParams(params);
		window.location.href = url;
	};

	return (
		<Box marginTop={3} display="flex" gap={2} alignItems="center">
			<Typography variant="subtitle2" component="p">
				Войти с помощью:
			</Typography>
			<Button variant="outlined" size="medium" onClick={loginGoogle}>
				<IoLogoGoogle size={24} />
			</Button>
			<Button variant="outlined" size="medium" onClick={loginYandex}>
				<FaYandex size={24} />
			</Button>
			<Button variant="outlined" size="medium" onClick={loginVk}>
				<FaVk size={24} />
			</Button>
		</Box>
	);
};
