'use client';

import axios from 'axios';
import { FC, useState } from 'react';

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = ({}) => {
  const [output, setOutput] = useState('');

  async function handleInvalidateRecruit() {
    const res = await axios.post('admin/api/revalidate/recruit');
    setOutput(JSON.stringify(res.data));
  }

  return (
    <div>
      <button onClick={handleInvalidateRecruit}>리크루트 페이지 다시 로드</button>
      <p>Result: {output}</p>
    </div>
  );
};

export default AdminPage;
