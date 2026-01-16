import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	return {
		plugins: [react()],
		base: `/${command === "build" ? "public/" : ""}`,
		build: { outDir: "dist" },
		server: {
			port: 80,
			proxy: {
				"/api": {
					target: "https://mich-man.ru/api",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
