import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { path = '/' } = req.body
    await res.revalidate(path)

    return res.json({ revalidated: true })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Error revalidating')
  }
}
