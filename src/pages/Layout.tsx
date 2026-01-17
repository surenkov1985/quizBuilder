import { Outlet, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// import { useLogoutMutation } from "../app/api"
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const drawerWidth = 240;

export const Layout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	// const [apiLogout] = useLogoutMutation()
	const dispatch = useDispatch();

	const handleLogout = async () => {
		// await apiLogout(null)
		dispatch(logout());
	};

	const menu = [
		{ label: "Проекты", path: "/" },
		{ label: "Профиль", path: "/profile" },
		{ label: "Подписка", path: "/billing" },
	];

	const drawer = (
		<Box>
			<Typography variant="h6" sx={{ p: 2 }}>
				Quiz Builder
			</Typography>
			<List>
				{menu.map((item) => (
					<ListItemButton
						key={item.path}
						component={NavLink}
						to={item.path}
						sx={{
							"&.active": {
								backgroundColor: "rgba(0,0,0,0.08)",
							},
						}}
					>
						<ListItemText primary={item.label} />
					</ListItemButton>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "100vh" }}>
			{/* Header */}
			<AppBar position="static" sx={{ zIndex: 1201, width: "100%", height: "max-content" }}>
				<Toolbar>
					<IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						SaaS Dashboard
					</Typography>

					<IconButton color="inherit" onClick={handleLogout}>
						<LogoutIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box sx={{ display: "flex", flexGrow: 1, width: "100%" }}>
				{/* Sidebar desktop */}
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": { width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>

				{/* Sidebar mobile */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>

				{/* Content */}
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};
