import fs from 'fs'
import { Feed } from 'feed'
import { HOME_URL } from '~envs'
import { IComicMetadata } from './mdx'

export async function generateRssFeed(data: Array<{ data: IComicMetadata }>) {
  const feedOptions = {
    title: 'WAGMI by Console Labs',
    description: 'Indie financial webcomic to get through life-bonkers',
    id: HOME_URL,
    link: HOME_URL,
    image: `${HOME_URL}/favicon-32x32.png`,
    favicon: `${HOME_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Console Labs`,
    feedLinks: {
      rss2: `${HOME_URL}/rss.xml`,
      atom1: `${HOME_URL}/atom.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  data.forEach(({ data: comic }) => {
    feed.addItem({
      title: comic.title,
      id: `${HOME_URL}/${comic.slug}`,
      link: `${HOME_URL}/${comic.slug}`,
      description: comic.description,
      image: `${HOME_URL}/${comic.images[0]}`,
      date: new Date(comic.date),
    })
  })

  fs.writeFileSync('./public/rss.xml', feed.rss2())
  fs.writeFileSync('./public/atom.xml', feed.atom1())
}
