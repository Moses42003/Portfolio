const _env = typeof import.meta !== "undefined" ? import.meta.env : process.env;

export const SITE_NAME = (_env.VITE_SITE_NAME as string) ?? "MOSES DEV";
export const SITE_DESCRIPTION =
	(_env.VITE_SITE_DESCRIPTION as string) ?? "Full-Stack Developer portfolio for modern, fast and scalable web applications.";
export const CANONICAL_URL = (_env.VITE_CANONICAL_URL as string) ?? "https://moses.dev";
