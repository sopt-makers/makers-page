import Header from '@/components/header/Header';
import Greeting from '@/components/mainpage/Greeting';

import { gateway } from '../gateway';

export default async function Page() {
  const result = await gateway.internal.ping.query('hello');

  return (
    <>
      <Header />
      <Greeting />
      <div className='flex text-center'>Hello world! {result}</div>
    </>
  );
}
