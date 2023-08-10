import type { NextApiRequest, NextApiResponse } from 'next'
import NotionClient from '~utils/notion'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const resp = await NotionClient.getComics(
      Number(req.query.page_size),
      req.query.start_cursor as string,
      req.query.direction as any,
      req.query.tag as any,
    )
    res.status(200).json(resp)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: 'internal server error' })
  }
}
