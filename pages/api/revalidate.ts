import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { page_number } = req.query
    if (page_number) {
      await res.revalidate('/commics/' + page_number) // revalidate the commic details page
    } else {
      await res.revalidate('/') // revalidate the homepage
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.error(err)
    return res.status(500).send('Error revalidating')
  }
}
