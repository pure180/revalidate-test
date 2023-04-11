import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  __request: NextApiRequest,
  res: NextApiResponse
) {
  let revalidated = false;

  try {
    await res.revalidate('/');
    revalidated = true;
  } catch (err) {
    console.log(err);
  }

  res.json({
    revalidated,
  });
}
