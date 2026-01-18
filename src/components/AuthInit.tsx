import { useMeQuery } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { logout, setInited, setUser } from "@/features/auth/authSlice";
import { useEffect, type ReactNode } from "react";
import { Loader } from "./Loader/Loader";

type Props = {
	children: ReactNode;
};

export const AuthInit = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	const access = useAppSelector((state) => state.auth.access);

	const { data, error, isFetching } = useMeQuery();

	useEffect(() => {
		if (data) {
			dispatch(setUser(data));
		}
		if (error) {
			dispatch(logout());
		}
		if (!access) {
			dispatch(setInited());
		}
	}, [data, error, access]);

	if (isFetching) {
		return <Loader />;
	}
	return children;
};
