import { useProjectsQuery } from "@/app/api";

export const ProjectsPage = () => {
	const res = useProjectsQuery();
	console.log(res);

	return <h1>Projects</h1>;
};
