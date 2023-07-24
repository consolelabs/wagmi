import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'
import NotionRichText from '~components/NotionRichtext'
import { getNotionColor } from '~utils/color'
import { getFileURL } from '~utils/notion'
import { IComic } from '~utils/notion/types'

function ComicViewport({
  data,
  nextRandomID,
  prevID,
  nextID,
}: {
  data: IComic
  nextRandomID: string | number
  prevID: string
  nextID?: string | null
}) {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/comics/[slug]', `/comics/${nextRandomID}`)
  }, [nextRandomID, router])

  const renderNavbar = () => {
    return [
      <Link
        href={`/comics/${prevID}`}
        key="prev"
        prefetch
        className="rounded-full bg-mochi hover:bg-mochi-400 p-2 flex items-center justify-center"
      >
        <Icon
          icon="heroicons-chevron-left-solid"
          className="w-6 h-6 pr-1 text-mochi-50"
        />
      </Link>,
      <button
        type="button"
        key="random"
        className="rounded-full bg-mochi hover:bg-mochi-400 p-2 flex items-center justify-center text-mochi-50"
        onClick={() => router.push('/comics/[slug]', `/comics/${nextRandomID}`)}
      >
        <Icon
          icon="heroicons-sparkles-solid"
          className="w-6 h-6 text-mochi-50"
        />
      </button>,
      <Link
        href="/comics"
        key="list"
        className="rounded-full bg-mochi hover:bg-mochi-400 p-2 flex items-center justify-center"
      >
        <Icon
          icon="heroicons-banknotes-solid"
          className="w-6 h-6 text-mochi-50"
        />
      </Link>,
      nextID ? (
        <Link
          key="next"
          href={`/comics/${nextID}`}
          prefetch
          className="rounded-full bg-mochi hover:bg-mochi-400 p-2 flex items-center justify-center"
        >
          <Icon
            icon="heroicons-chevron-right-solid"
            className="w-6 h-6 pl-1 text-mochi-50"
          />
        </Link>
      ) : (
        <button
          type="button"
          key="next-disabled"
          className="rounded-full bg-mochi p-2 flex items-center justify-center hover:cursor-not-allowed"
          disabled
        >
          <Icon
            icon="heroicons-chevron-right-solid"
            className="w-6 h-6 pl-1 text-mochi-50"
          />
        </button>
      ),
    ]
  }

  return (
    <div className="relative z-40 w-full m-auto">
      <div className="mt-4 flex items-center justify-center space-x-2">
        {renderNavbar()}
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="text-2xl text-left mb-6">
          <NotionRichText
            items={data.properties.Name.title as any}
            className="font-normal"
          />
          {data.properties.Tags.multi_select?.length > 0 && (
            <div className="flex items-center justify-start flex-wrap gap-2">
              {data.properties.Tags.multi_select.map((tg) => (
                <Link
                  key={tg.id}
                  href={`/comics?tag=${tg.name}`}
                  className="border-none text-xs px-2 py-1 rounded-lg text-white flex items-center justify-center gap-1 hover:cursor-pointer"
                  style={{ ...getNotionColor(tg.color) }}
                >
                  <Icon
                    icon="heroicons-tag-solid"
                    className="w-3 h-3 text-white"
                    style={{
                      ...getNotionColor(tg.color),
                      background: 'none',
                    }}
                  />
                  <span className="font-normal">{tg.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="px-6">
          <img
            src={getFileURL(data.properties.Photo)!}
            alt={data.properties.Name.title[0].plain_text}
            className="max-w-full mx-auto"
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-2">
        {renderNavbar()}
      </div>
    </div>
  )
}

export default memo(ComicViewport)
