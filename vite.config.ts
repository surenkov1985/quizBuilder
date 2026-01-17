import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	return {
		plugins: [react()],
		base: `/${command === "build" ? "public/" : ""}`,
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
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
