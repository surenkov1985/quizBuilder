import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<header>header</header>
			<aside>aside</aside>
			<main className="main">
				<Outlet />
			</main>
		</>
	);
};
