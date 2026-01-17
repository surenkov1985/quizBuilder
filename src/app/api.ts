import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccess, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://mich-man.ru/api",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as any).auth.access;
		if (token) headers.set("Authorization", `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithRefresh = async (args: any, api: any, extra: any) => {
	let result = await baseQuery(args, api, extra);

	if (result.error?.status === 401) {
		const refresh = await baseQuery({ url: "/auth/refresh", method: "POST" }, api, extra);
		// @ts-ignore
		if (refresh.data?.access) {
			// @ts-ignore
			api.dispatch(setAccess(refresh.data.access));
			result = await baseQuery(args, api, extra);
		} else {
			api.dispatch(logout());
		}
	}

	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRefresh,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		me: builder.query<any, void>({
			query: () => "/auth/me",
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
		projects: builder.query<any[], void>({
			query: () => "/projects",
		}),
		createProject: builder.mutation({
			query: (body) => ({
				url: "/projects",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useMeQuery, useLogoutMutation, useProjectsQuery, useCreateProjectMutation } = api;
