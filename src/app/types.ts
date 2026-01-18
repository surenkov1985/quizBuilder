export type LoginRequest = {
	email: string;
	password: string;
};
export type ForgotPasswordResponse = Pick<LoginRequest, "email">;
export type ResetPasswordResponse = {
	token: string;
	password: string;
};
export type LoginResponse = {
	access: string;
	expires_in: number;
};
export type MeResponse = {
	id: string;
	email: string;
	name: string | null;
	role: string;
	is_email_verified: 0 | 1;
	avatar: string | null;
	created_at: string;
};
export type Project = {
	id: string;
	name: string;
	domain: string;
	status: string;
	token: string;
	created_at: string;
};
export type CreateProjectRequest = {
	name: string;
	domain: string;
};

export type User = {
	id: string;
	email: string;
	name: string | null;
	role: string;
	is_email_verified: 0 | 1;
	avatar: string | null;
	created_at: string;
};
