import { internalGateway } from '../gateway/internal';

export default async function Page() {
  console.log('Env Page:', process.env.SSR_GATEWAY_URL);
  const result = await internalGateway.ping.query('hello');

  return <div className='flex text-center'>Hello world! {result}</div>;
}
