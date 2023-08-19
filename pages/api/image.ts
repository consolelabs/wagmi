import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let url = req.query.url as string
  if (process.env.NODE_ENV === 'production') {
    url = `.${url}`
  } else {
    url = `./public${url}`
  }
  if (!url) {
    res.status(404).end()
    return
  }
  let ext = url.split('.').at(-1) ?? 'jpeg'
  const filePath = path.resolve(process.cwd(), url)
  const buffer = fs.readFileSync(filePath)
  if (!['jpeg', 'png'].includes(ext.toLowerCase())) {
    ext = 'jpeg'
  }

  res.setHeader('Content-Type', `image/${ext}`)
  res.setHeader('Cache-Controle', 'max-age=300')
  res.send(buffer)
}
