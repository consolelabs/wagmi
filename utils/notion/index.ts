import { Client } from '@notionhq/client'
import { NOTION_DB_ID_WAGMI, NOTION_KEY } from '~envs'
import { IComic, IComicRsp } from './types'
import { getSlug, randomPageID } from './utils'

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

    const slug = getSlug(prevPage.results[0])
    const currentSlug = getSlug(data.results[0])

    return {
      data: data.results[0] as IComic,
      prevID: slug,
      nextID: null,
      maxID,
      pageID: currentSlug,
    }
  },
  async getOldestComic() {
    const page = await this._getByID(1)

    return getSlug(page.results[0])
  },
  async getRandomSlug(page: string) {
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)
    const curPage = await this._getBySlug(page)
    const curr = (curPage.results[0] as IComic).properties.CID.number!
    const nextID = randomPageID(maxID, curr)
    const pageResp = await this._getByID(nextID)

    return getSlug(pageResp.results[0] as IComic)
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
    }) as Promise<IComicRsp>
  },

  _getBySlug(slug: string) {
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
            property: 'Slug',
            formula: {
              string: {
                equals: slug,
              },
            },
          },
        ],
      },
    })
  },

  async getComicByID(slug: string) {
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)

    const comicRsp = (await this._getBySlug(slug)) as IComicRsp
    const numberSlug = comicRsp.results[0].properties.CID.number!
    const [prevResp, nextResp] = await Promise.all([
      numberSlug - 1 > 0 ? this._getByID(Number(numberSlug - 1)) : null,
      numberSlug + 1 <= maxID ? this._getByID(Number(numberSlug + 1)) : null,
    ])

    const prevSlug = prevResp ? getSlug(prevResp.results[0] as IComic) : null
    const nextSlug = nextResp ? getSlug(nextResp.results[0] as IComic) : null

    return {
      data: comicRsp!.results[0] as IComic,
      prevID: prevSlug,
      nextID: nextSlug,
      maxID,
    }
  },
}

export default NotionClient
