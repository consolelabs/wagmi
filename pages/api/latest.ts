import type { NextApiRequest, NextApiResponse } from 'next'
import NotionClient from '~utils/notion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const resp = await NotionClient.getLatestComic()
    res.status(200).json({ slug: resp.pageID })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'internal server error' })
  }
}
