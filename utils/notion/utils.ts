import { FilesPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { IComic } from './types'
import differenceInMinutes from 'date-fns/differenceInMinutes'

type FileType =
  | {
      file: {
        url: string
        expiry_time: string
      }
      name: string
      type?: 'file'
    }
  | {
      external: {
        url: string
      }
      name: string
      type?: 'external'
    }

export function getFileURL(file: FileType) {
  if (file.type === 'external') {
    return file.external.url
  }

  if (file.type === 'file') {
    return file.file.url
  }

  return '/assets/hug.png'
}

export function shouldRefreshPage(file: FileType) {
  if (file.type === 'file') {
    const diff = differenceInMinutes(
      new Date(),
      new Date(file.file.expiry_time),
    )
    if (diff < -30) {
      // no need to refresh if it's not expired yet
      return 'never'
    }

    if (diff >= 0) {
      return 'full'
    }

    return 'partial'
  }

  return 'never'
}

export function randomPageID(maxID: number, currentPage: number) {
  let randomID = maxID
  while (randomID == maxID || currentPage === randomID) {
    randomID = Math.floor(Math.random() * maxID) + 1
  }

  return randomID
}

export function getPageNamePlainText(page: IComic) {
  return page.properties.Name.title
    .map((title: any) => title.plain_text)
    .join(' ')
}
