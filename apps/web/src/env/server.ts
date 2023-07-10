import 'server-only';

export const SSR_GATEWAY_URL = process.env.SSR_GATEWAY_URL;
export const SSR_GATEWAY_API_KEY = process.env.SSR_GATEWAY_API_KEY;
export const DEV_MODE = `${process.env.DEV_MODE}`.trim().toLowerCase() === 'true';
