import { NextApiRequest, NextApiResponse } from 'next';

// on-demand ISR (주문형 재 검증) 적용 방법
// 이 함수를 실행하면 SSG가 재생성됨
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate('/');
    return res.json({ revalidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Revalidation Failed');
  }
}
