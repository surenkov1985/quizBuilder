import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { access: null as string | null },
	reducers: {
		setAccess: (s, a) => {
			s.access = a.payload;
		},
		logout: (s) => {
			s.access = null;
		},
	},
});

export const { setAccess, logout } = authSlice.actions;
export default authSlice.reducer;
