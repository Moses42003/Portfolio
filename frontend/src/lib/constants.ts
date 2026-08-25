const _env = (typeof import.meta !== "undefined" ? import.meta.env : {}) as Record<string, string | undefined>;

export const SITE_NAME = _env.VITE_SITE_NAME ?? "MOSES DEV";
export const SITE_DESCRIPTION =
	_env.VITE_SITE_DESCRIPTION ?? "Full-Stack Developer portfolio for modern, fast and scalable web applications.";
export const CANONICAL_URL = _env.VITE_CANONICAL_URL ?? "https://moses.dev";
