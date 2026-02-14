import { useMeQuery } from "@/app/api";
import { useAppDispatch } from "@/app/hooks/hooks";
import { Loader } from "@/components/Loader/Loader";
import { setUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const OauthCallback = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { data } = useMeQuery();
	if (data) {
		dispatch(setUser(data));
		navigate("/");
	} else {
		navigate("/login");
	}
	return <Loader />;
};
