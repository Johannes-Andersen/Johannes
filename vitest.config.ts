/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  base: "/",
  publicDir: "public",
  test: {
    coverage: {
      enabled: true,
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
    },
  },
});
