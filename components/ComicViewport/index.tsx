import Link from 'next/link'
import { memo } from 'react'
import Navigation from './Navigation'
import { formatDate } from '~utils/time'
import Tag from './Tag'
import { IComicMetadata } from '~utils/mdx'

function ComicViewport({
  data,
  prevID,
  nextID,
}: {
  data: IComicMetadata
  prevID: string
  nextID?: string | null
}) {
  return (
    <div className="relative z-40 w-full m-auto">
      <Navigation prevID={prevID} nextID={nextID} />

      <div className="relative max-w-4xl mx-auto z-0">
        <div className="text-2xl flex items-center justify-center mt-6 space-x-2 uppercase">
          <span className="hidden text-base md:block">
            {formatDate(data.date)}
          </span>
          {data.tags.map((tg) => (
            <Link key={tg} href={`/comics?tag=${tg}`}>
              <Tag tag={tg} />
            </Link>
          ))}
        </div>
        <div className="px-6">
          {data.images?.map((file) => (
            <img
              key={file}
              src={file}
              alt={data.title}
              className="max-w-full mx-auto"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ComicViewport)
