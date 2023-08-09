import Link from 'next/link'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import NotionRichText from '~components/NotionRichtext'
import { IComic } from '~utils/notion/types'
import Navigation from './Navigation'
import { getFileURL, shouldRefreshPage } from '~utils/notion/utils'
import { formatDate } from '~utils/time'
import Tag from './Tag'
import { useRouter } from 'next/router'
import { fetcher } from '~utils/fetcher'
import { sleep } from '@dwarvesf/react-utils'
import ImageLoader from './ImageLoader'

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
  const router = useRouter()
  const shouldReload = shouldRefreshPage(data.properties.Photo.files[0])

  useEffect(() => {
    if (shouldReload == 'never') {
      return
    }
    console.log('[revalidate]', router.asPath)
    fetcher
      .post('/api/revalidate', { path: router.asPath })
      .then(() => sleep(500)) // wait a bit
      .then(() => {
        if (shouldReload == 'full') {
          router.reload()
        }
      })
      .catch((err) => {
        console.error('[ERROR]', err)
      })
  }, [router, shouldReload])

  return (
    <div className="relative z-40 w-full m-auto" key={data.id}>
      <Navigation prevID={prevID} nextID={nextID} maxID={maxID} key={data.id} />

      <div className="relative max-w-4xl mx-auto">
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
            <ImageLoader
              key={[data.id, idx].join('-')}
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
