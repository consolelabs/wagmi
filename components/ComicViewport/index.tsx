import Link from 'next/link'
import { memo } from 'react'
import NotionRichText from '~components/NotionRichtext'
import { IComic } from '~utils/notion/types'
import Navigation from './Navigation'
import { getFileURL } from '~utils/notion/utils'
import { formatDate } from '~utils/time'
import Tag from './Tag'

function ComicViewport({
  data,
  maxID,
  prevID,
  nextID,
}: {
  data: IComic
  maxID: number
  prevID: string
  nextID?: string | null
}) {
  return (
    <div className="relative z-40 w-full m-auto">
      <Navigation prevID={prevID} nextID={nextID} maxID={maxID} />

      <div className="relative max-w-2xl mx-auto">
        <div className="text-2xl flex items-center justify-center mt-6 space-x-2 uppercase">
          <span className="hidden text-base md:block">
            {formatDate(data.created_time)}
          </span>
          {data.properties.Tags.multi_select.map((tg) => (
            <Link key={tg.id} href={`/comics?tag=${tg.name}`}>
              <Tag tag={tg.name} />
            </Link>
          ))}
        </div>
        <div className="px-6">
          {data.properties.ShowName?.checkbox && (
            <NotionRichText
              items={data.properties.Name.title as any}
              className="font-[YanoneKaffeesatz-Bold] text-4xl text-center w-full block py-3"
            />
          )}
          {data.properties.Photo.files?.map((file, idx) => (
            <img
              key={idx}
              src={getFileURL(file)}
              alt={data.properties.Name.title[0].plain_text}
              className="max-w-full mx-auto"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ComicViewport)
