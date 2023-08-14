import type { NextApiRequest, NextApiResponse } from 'next'
import NotionClient from '~utils/notion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { page_id } = req.query

    const [randomResp, newestResp, oldestSlug] = await Promise.all([
      NotionClient.getRandomSlug(page_id as string),
      NotionClient.getLatestComic(),
      NotionClient.getOldestComic(),
    ])
    res.status(200).json({
      slug: randomResp,
      oldestSlug: oldestSlug,
      newestSlug: newestResp.pageID,
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'internal server error' })
  }
}
