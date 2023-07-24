import { Client } from '@notionhq/client'
import { NOTION_DB_ID_WAGMI, NOTION_KEY } from '~envs'
import { IComic, IComicRsp } from './types'
import { FilesPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'

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
    let randomID = maxID
    while (randomID == maxID) {
      randomID = Math.floor(Math.random() * maxID) + 1
    }

    const randomPage = await this._getByID(Number(randomID))

    const slug = slugify(
      (randomPage as IComicRsp).results[0].properties.Name.title[0].plain_text,
    )

    return {
      data: data.results[0] as IComic,
      prevID: data.results[0].properties.CID.number! - 1,
      nextID: null,
      nextRandomID: [randomID, slug].join('-'),
    }
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
    const idNumber = Number(id.split('-')[0])
    const data = await this.getComics(1)
    const maxID = Number(data.results[0].properties.CID.number)

    let randomID = 1
    while (randomID === Number(idNumber)) {
      randomID = Math.floor(Math.random() * maxID) + 1
    }

    const [comicRsp, randomPage] = await Promise.all([
      this._getByID(Number(idNumber)),
      this._getByID(Number(randomID)),
    ])

    const slug = slugify(
      (randomPage as IComicRsp).results[0].properties.Name.title[0].plain_text,
    )

    return {
      data: comicRsp.results[0] as IComic,
      prevID: idNumber - 1,
      nextID: idNumber === maxID ? null : idNumber + 1,
      nextRandomID: [randomID, slug].join('-'),
    }
  },
}

export function getFileURL(file: FilesPropertyItemObjectResponse) {
  const firstItem = file.files?.[0]
  if (!firstItem) {
    return null
  }

  if (firstItem.type === 'external') {
    return firstItem.external.url
  }

  if (firstItem.type === 'file') {
    return firstItem.file.url
  }

  return null
}

export default NotionClient
