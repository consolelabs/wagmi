import {
  FilesPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  QueryDatabaseResponse,
  PageObjectResponse,
  CheckboxPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export interface IComicRsp extends Omit<QueryDatabaseResponse, 'result'> {
  results: IComic[]
}

export interface IComic extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    CID: NumberPropertyItemObjectResponse
    ShowName: CheckboxPropertyItemObjectResponse
    Photo: FilesPropertyItemObjectResponse
    Name: {
      type: 'title'
      title: Array<RichTextItemResponse>
      id: string
    }
    Tags: MultiSelectPropertyItemObjectResponse
  }
}
