import type { NextApiRequest, NextApiResponse } from 'next'
import { getNewestFile, getOldestFile, getRandomFile } from '~utils/mdx'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { page_id } = req.query

    const [newestResp, oldestResp, randomResp] = await Promise.all([
      getNewestFile(),
      getOldestFile(),
      getRandomFile(page_id as string),
    ])

    res.status(200).json({
      slug: randomResp.data.slug,
      oldestSlug: oldestResp.data.slug,
      newestSlug: newestResp.data.slug,
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'internal server error' })
  }
}
