import { Client } from '@notionhq/client'
import { NOTION_DB_ID_WAGMI, NOTION_KEY } from '~envs'
import { IComic, IComicRsp } from './types'
import slugify from 'slugify'
import { getPageNamePlainText, randomPageID } from './utils'
import split from 'lodash/split'

// Initializing a client
const notion = new Client({
  auth: NOTION_KEY,
})

const NotionClient = {
  async getComics(
    page_size = 10,
    start_cursor?: string,
    direction?: 'ascending' | 'descending',
    tag?: string,
  ) {
    const extraFilters = []
    if (tag) {
      extraFilters.push({
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      })
    }
    const data = await notion.databases.query({
      database_id: NOTION_DB_ID_WAGMI!,
      page_size: page_size,
      start_cursor,
      filter: {
        and: [
          {
            property: 'Name',
            title: {
              is_not_empty: true,
            },
          },
          {
            property: 'Photo',
            files: {
              is_not_empty: true,
            },
          },
          {
            property: 'CID',
            number: {
              is_not_empty: true,
            },
          },
          ...extraFilters,
        ],
      },
      sorts: [
        {
          property: 'CID',
          direction: direction || 'descending',
        },
      ],
    })

    return data as IComicRsp
  },

  async getLatestComic() {
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)

    const prevID = data.results[0].properties.CID.number! - 1
    const prevPage = await this._getByID(Number(prevID))

    const slug = slugify(getPageNamePlainText(prevPage.results[0] as IComic))
    const currentSlug = [
      data.results[0].properties.CID.number!,
      slugify(getPageNamePlainText(data.results[0] as IComic)),
    ].join('-')

    return {
      data: data.results[0] as IComic,
      prevID: `${prevID}-${slug}`,
      nextID: null,
      maxID,
      pageID: currentSlug,
    }
  },
  async getRandomSlug(page: string) {
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)

    const curr = Number(split(page, '-')[0])
    const nextID = randomPageID(maxID, curr)
    const pageResp = await this._getByID(nextID)

    return [
      nextID,
      slugify(getPageNamePlainText(pageResp.results[0] as IComic)),
    ].join('-')
  },

  _getByID(cid: number) {
    return notion.databases.query({
      database_id: NOTION_DB_ID_WAGMI!,
      page_size: 1,
      filter: {
        and: [
          {
            property: 'Name',
            title: {
              is_not_empty: true,
            },
          },
          {
            property: 'Photo',
            files: {
              is_not_empty: true,
            },
          },
          {
            property: 'CID',
            number: {
              equals: cid,
            },
          },
        ],
      },
    })
  },

  async getComicByID(id: string) {
    const idNumber = Number(split(id, '-')[0])
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)

    const [comicRsp, prevResp, nextResp] = await Promise.all([
      this._getByID(Number(idNumber)),
      idNumber - 1 > 0 ? this._getByID(Number(idNumber - 1)) : null,
      idNumber + 1 <= maxID ? this._getByID(Number(idNumber + 1)) : null,
    ])

    const prevSlug = prevResp
      ? [
          idNumber - 1,
          slugify(getPageNamePlainText(prevResp.results[0] as IComic)),
        ].join('-')
      : null

    const nextSlug = nextResp
      ? [
          idNumber + 1,
          slugify(getPageNamePlainText(nextResp.results[0] as IComic)),
        ].join('-')
      : null

    return {
      data: comicRsp!.results[0] as IComic,
      prevID: prevSlug,
      nextID: nextSlug,
      maxID,
    }
  },
}

export default NotionClient
