import type { NextApiRequest, NextApiResponse } from 'next'
import NotionClient from '~utils/notion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { page_number } = req.query

    const page_id = page_number as string
    const [randomResp, newestResp] = await Promise.all([
      NotionClient.getRandomSlug(page_id),
      NotionClient.getLatestComic(),
    ])
    res.status(200).json({ slug: randomResp, newestSlug: newestResp.pageID })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'internal server error' })
  }
}
