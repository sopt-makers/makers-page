import 'server-only';

export const SSR_GATEWAY_URL = process.env.SSR_GATEWAY_URL;
export const SSR_GATEWAY_API_KEY = process.env.SSR_GATEWAY_API_KEY;

console.log('Env Const', process.env.SSR_GATEWAY_API_KEY);

function _required(key: string, value: unknown) {
  if (typeof value !== 'string' || value === '') {
    throw new Error(`Env value ${key} is not properly set.`);
  }

  return value;
}
