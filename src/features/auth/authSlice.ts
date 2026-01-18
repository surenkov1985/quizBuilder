import type { User } from "@/app/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	access: string | null;
	token: string | null;
	inited: boolean;
	user: User | null;
	verifyEmail: string | null;
};

const initialState: InitialState = {
	access: null,
	token: localStorage.getItem("access"),
	inited: false,
	user: null,
	verifyEmail: sessionStorage.getItem("verify_email"),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccess: (state, action: PayloadAction<string>) => {
			const token = action.payload;
			localStorage.setItem("access", token);
			state.access = token;
		},
		logout: (state) => {
			localStorage.removeItem("access");
			state.access = null;
			state.user = null;
			state.inited = false;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setVerifyEmail: (state, action: PayloadAction<string>) => {
			const email = action.payload;
			sessionStorage.setItem("verify_email", email);
			state.verifyEmail = email;
		},
		setInited: (state) => {
			state.inited = true;
		},
	},
});

export const { setAccess, logout, setVerifyEmail, setInited, setUser } = authSlice.actions;
export default authSlice.reducer;
