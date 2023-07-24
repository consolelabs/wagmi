import { Icon } from '@iconify/react'
import uniqBy from 'lodash/uniqBy'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import QueryString from 'qs'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWR from 'swr'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import NotionRichText from '~components/NotionRichtext'
import { getNotionColor } from '~utils/color'
import { fetcher } from '~utils/fetcher'
import NotionClient from '~utils/notion'
import { IComic, IComicRsp } from '~utils/notion/types'
import { formatDate } from '~utils/time'

const ItemsPerPage = 20

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tag = ctx.query.tag as string
  const data = await NotionClient.getComics(
    ItemsPerPage,
    undefined,
    'ascending',
    tag,
  )

  return {
    props: {
      initialData: data,
      tag: tag || '',
    },
  }
}

export default function Page({
  initialData,
  tag,
}: {
  initialData: IComicRsp
  tag?: string
}) {
  const [data, setData] = useState<IComic[]>(initialData.results)
  const { ref, inView } = useInView()

  const [hasMore, setHasMore] = useState<boolean>(initialData.has_more)
  const [page, setPage] = useState<string | null | undefined>()

  const { data: resp, isLoading } = useSWR(
    ['/api/comics', page, tag],
    async () => {
      const q = QueryString.stringify({
        page_size: ItemsPerPage,
        start_cursor: page,
        direction: 'ascending',
        tag,
      })

      return fetcher.get<IComicRsp>(`/api/comics?${q}`)
    },
    {
      fallbackData: initialData,
    },
  )

  useEffect(() => {
    setHasMore(resp?.has_more || false)
    if (isLoading || !resp?.results) {
      return
    }

    setData((prev) => {
      if (prev) {
        return uniqBy([...prev, ...resp.results], 'id')
      }

      return uniqBy(resp.results, 'id')
    })
  }, [isLoading, resp?.has_more, resp?.next_cursor, resp?.results])

  useEffect(() => {
    if (!isLoading && inView && hasMore) {
      setPage(resp?.next_cursor)
    }
  }, [hasMore, inView, isLoading, resp?.next_cursor])

  return (
    <div className="relative overflow-hidden">
      <Layout>
        <SEO />
        <div className="lg:mt-40 flex flex-col justify-between relative body-block px-6 md:px-12">
          <h1 className="relative z-20 text-3xl font-bold text-center">
            Comics Archive
          </h1>
          {tag && (
            <div className="relative z-20 mt-4 flex items-center">
              <div className="mr-2">Filtered by</div>
              <Link
                href={`/comics`}
                className="border-none text-sm px-2 py-1 rounded-lg text-white flex items-center justify-center gap-1 hover:cursor-pointer group"
                style={{ ...getNotionColor(tag) }}
              >
                <Icon
                  icon="heroicons-tag-solid"
                  className="w-3 h-3 text-white block group-hover:hidden"
                  style={{
                    ...getNotionColor(tag),
                    background: 'none',
                  }}
                />
                <Icon
                  icon="heroicons-x-mark-solid"
                  className="w-3 h-3 text-white hidden group-hover:block"
                  style={{
                    ...getNotionColor(tag),
                    background: 'none',
                  }}
                />
                <span className="font-normal">{tag}</span>
              </Link>
            </div>
          )}
          <div className="relative space-y-2 mt-12 z-20">
            {data?.map((item) => (
              <Link
                key={item.id}
                href="/comics/[slug]"
                as={`/comics/${item.properties.CID.number}`}
                className="flex gap-x-2 items-center p-3 pr-4 w-full bg-white border border-mochi-50 rounded-lg hover:shadow hover:border-transparent"
              >
                <span className="text-semibold text-xs">
                  {item.properties.CID.number}.
                </span>
                <p className="text-semibold flex-1">
                  <NotionRichText items={item.properties.Name.title as any} />
                </p>
                <div className="flex items-center justify-end space-x-2">
                  {item.properties.Tags.multi_select?.length > 0 && (
                    <div className="flex items-center justify-center flex-wrap gap-2">
                      {item.properties.Tags.multi_select.map((tg) => (
                        <Link
                          key={tg.id}
                          href={`/comics?tag=${tg.name}`}
                          className="border-none text-sm px-2 py-1 rounded-lg text-white flex items-center justify-center gap-1 hover:cursor-pointer"
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
                  <span className="hidden text-sm md:block">
                    {formatDate(item.created_time)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {!!hasMore && !!resp?.next_cursor && (
            <div ref={ref} className="mt-4">
              <div className="flex gap-x-3 items-start p-3 pr-4 w-full bg-white rounded-lg shadow-full">
                <div className="flex items-baseline w-6 h-6">
                  <Icon
                    icon="ei:spinner"
                    className="flex-shrink-0 w-6 h-6 animate-spin"
                  />
                </div>
                <span className="my-auto text-sm font-semibold break-all">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}
