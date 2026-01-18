import {
	createApi,
	fetchBaseQuery,
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
	type QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import { setAccess, logout } from "../features/auth/authSlice";
import type { CreateProjectRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, MeResponse, Project, ResetPasswordResponse } from "./types";

type RefreshResult = QueryReturnValue<any, FetchBaseQueryError>;

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as any).auth.access;
		if (token) headers.set("Authorization", `Bearer ${token}`);
		return headers;
	},
});
let refreshPromise: Promise<RefreshResult> | null = null;
const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error?.status !== 401) return result;

	// mutex
	if (!refreshPromise) {
		refreshPromise = Promise.resolve(baseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions));
	}

	const refreshResult = await refreshPromise;
	refreshPromise = null;

	if ((refreshResult as any).data?.access) {
		api.dispatch(setAccess((refreshResult as any).data.access));

		result = await baseQuery(args, api, extraOptions);
	} else {
		api.dispatch(logout());
	}

	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRefresh,
	endpoints: (build) => ({
		signup: build.mutation<void, LoginRequest>({
			query: (body) => ({
				url: "/auth/signup",
				method: "POST",
				body,
			}),
		}),
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		forgotPassword: build.mutation<void, ForgotPasswordResponse>({
			query: (body) => ({
				url: "/forgot-password",
				method: "POST",
				body,
			}),
		}),
		resetPassword: build.mutation<void, ResetPasswordResponse>({
			query: (body) => ({
				url: "/reset-password",
				method: "POST",
				body,
			}),
		}),
		verifyEmail: build.mutation<void, ForgotPasswordResponse>({
			query: (body) => ({
				url: "/resent-verification",
				method: "POST",
				body,
			}),
		}),
		me: build.query<MeResponse, void>({
			query: () => "/auth/me",
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
		}),
		projects: build.query<Project[], void>({
			query: () => "/projects",
		}),
		createProject: build.mutation<void, CreateProjectRequest>({
			query: (body) => ({
				url: "/projects",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useMeQuery,
	useLogoutMutation,
	useProjectsQuery,
	useCreateProjectMutation,
	useSignupMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useVerifyEmailMutation,
	useLazyMeQuery,
} = api;
