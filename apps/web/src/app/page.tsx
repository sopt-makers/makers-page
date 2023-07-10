import { internalGateway } from '../gateway/internal';

export default async function Page() {
  const result = await internalGateway.ping.query('hello');

  return <div className='flex text-center'>Hello world! {result}</div>;
}
