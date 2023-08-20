import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let url = req.query.url as string
  if (process.env.NODE_ENV === 'production') {
    const __next__base__dirname = __dirname.split('.next')[0]
    url = path.join(__next__base__dirname, 'public', url.slice(1))
  } else {
    url = `./public${url}`
  }
  if (!url) {
    res.status(404).end()
    return
  }
  let ext = url.split('.').at(-1) ?? 'jpeg'
  const buffer = fs.readFileSync(url)
  if (!['jpeg', 'png'].includes(ext.toLowerCase())) {
    ext = 'jpeg'
  }

  res.setHeader('Content-Type', `image/${ext}`)
  res.setHeader('Cache-Control', 'max-age=300')
  res.send(buffer)
}
