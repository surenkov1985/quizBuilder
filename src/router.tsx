import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { useMeQuery } from "./app/api";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { VerufyEmail } from "./pages/VerifyEmail";
import { OauthCallback } from "./pages/OauthCallback";
import { OauthCallbackVk } from "./pages/OauthCallbackVk";

const Protected = ({ children }: any) => {
	const { data, isLoading } = useMeQuery();
	if (isLoading) return null;
	if (!data) return <Navigate to="/login" />;
	if (data.is_email_verified != 1) return <Navigate to="/verify-email" />;
	return children;
};

const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: (
					<Protected>
						<ProjectsPage />
					</Protected>
				),
			},
		],
	},
	{ path: "/login", element: <LoginPage /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/forgot-password", element: <ForgotPassword /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/verify-email", element: <VerufyEmail /> },
	{ path: "/oauth/callback", element: <OauthCallback /> },
	{ path: "/oauth/callback/vk", element: <OauthCallbackVk /> },
];

export const router = createBrowserRouter(routes);
