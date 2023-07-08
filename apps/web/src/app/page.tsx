import { internalGateway } from '../gateway/internal';

export default async function Page() {
  console.log('Env:', process.env);
  const result = await internalGateway.ping.query('hello');

  return <div className='flex text-center'>Hello world! {result}</div>;
}
