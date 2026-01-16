import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { ProjectsPage } from "./pages/ProjectsPage";

const Protected = ({ children }: any) => {
	// const { data, isLoading } = useMeQuery();
	// if (isLoading) return null;
	// if (!data) return <Navigate to="/login" />;
	return children;
};

const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{ path: "/login", element: <LoginPage /> },
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
];

export const router = createBrowserRouter(routes);
