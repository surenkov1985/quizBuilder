import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText, IconButton, Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useLogoutMutation } from "../app/api";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { FaRegUser } from "react-icons/fa";

const drawerWidth = 240;

export const Layout = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [apiLogout] = useLogoutMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.user);
	console.log(user);

	const handleLogout = async () => {
		await apiLogout();
		dispatch(logout());
		navigate("/login");
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

	function stringToColor(string: string) {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = "#";

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	}

	function stringAvatar(name: string | null) {
		if (name) {
			return {
				sx: {
					bgcolor: stringToColor(name),
				},
				children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
			};
		} else {
			return {
				children: <FaRegUser />,
			};
		}
	}

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
					<Box display="flex" gap={3}>
						{user && (user.avatar ? <Avatar src={user.avatar} /> : <Avatar {...stringAvatar(user?.name)} />)}
						<IconButton color="inherit" onClick={handleLogout}>
							<LogoutIcon />
						</IconButton>
					</Box>
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
