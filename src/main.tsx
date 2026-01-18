import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./assets/global.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { AuthInit } from "./components/AuthInit.tsx";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<AuthInit>
			<RouterProvider router={router} />
		</AuthInit>
	</Provider>,
);
