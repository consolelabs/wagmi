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
    <div className="relative z-40 m-auto w-2/3">
      <Navigation prevID={prevID} nextID={nextID} />

      <div className="relative z-0 mx-auto max-w-4xl">
        <div className="flex justify-center items-center mt-6 space-x-2 text-2xl uppercase">
          <span className="text-xs md:text-sm">{formatDate(data.date)}</span>
          {data.tags.map((tg) => (
            <Link
              key={tg}
              href={`/comics?tag=${tg}`}
              className="inline-flex justify-center items-center"
            >
              <Tag tag={tg} />
            </Link>
          ))}
        </div>
        {data.show_title && (
          <h1 className="text-5xl text-center mt-6">{data.title}</h1>
        )}
        <div className="px-6 mt-6">
          {data.images?.map((file) => (
            <img
              key={file}
              src={file}
              alt={data.title}
              className="mx-auto max-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ComicViewport)
