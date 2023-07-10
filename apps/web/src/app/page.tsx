import { gateway } from '../gateway';

export default async function Page() {
  const result = await gateway.internal.ping.query('hello');

  return <div className='flex text-center'>Hello world! {result}</div>;
}
