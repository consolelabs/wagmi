import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Layout } from '~components/layout'

import { SEO } from '~components/layout/seo'
import Navigation from '~components/ComicViewport/Navigation'
import NotionRichText from '~components/NotionRichtext'
import { getNotionColor } from '~utils/color'
import NotionClient from '~utils/notion'
import { IComic } from '~utils/notion/types'
import {
  getFileURL,
  getPageNamePlainText,
  shouldRefreshPage,
} from '~utils/notion/utils'
import { formatDate } from '~utils/time'
import slugify from 'slugify'
import { fetcher } from '~utils/fetcher'
import { sleep } from '@dwarvesf/react-utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pages: Array<IComic> = []
  let cursor: string | undefined = undefined
  while (true) {
    const res = await NotionClient.getComics(100, cursor)
    pages.push(...res.results)
    if (!res.has_more) {
      break
    }
    cursor = res.next_cursor || undefined
  }

  // Get the paths we want to pre-render based on posts

  return {
    props: {
      initialData: pages,
    },
    revalidate: 10,
  }
}

export default function Page({ initialData }: { initialData: IComic[] }) {
  const router = useRouter()

  const tag = router.query.tag as string | undefined

  const data = useMemo(() => {
    // filter by tag
    if (tag) {
      return initialData.filter((item) => {
        const tags = item.properties.Tags.multi_select.map((tag) => tag.name)
        return tags.includes(tag as string)
      })
    }
    return initialData
  }, [initialData, tag])

  const shouldReload = shouldRefreshPage(data[0].properties.Photo.files[0])

  useEffect(() => {
    console.log(`[ShouldReload]`, shouldReload)

    if (shouldReload === 'never') {
      return
    }

    fetcher
      .post(`/api/revalidate`, { path: router.asPath })
      .then(() => sleep(500)) // wait a bit
      .then(() => {
        if (shouldReload === 'full') {
          router.reload()
        }
      })
      .catch((err) => {
        console.error(`[ERROR]`, err)
      })
  }, [router, shouldReload])

  return (
    <div className="relative">
      <Layout>
        <SEO />
        <Navigation />
        <div className="mt-12 flex flex-col justify-between relative body-block px-6 md:px-12 max-w-4xl mx-auto">
          <h1 className="relative z-20 text-3xl font-bold text-center font-[YanoneKaffeesatz-Bold]">
            All comics
          </h1>
          {tag && (
            <div className="relative z-20 mt-4 flex items-center mx-auto">
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
          <p className="text-center mt-8 text-3xl">
            {new Date().getFullYear()}
          </p>
          <div
            className={classNames(
              'relative mt-4 z-20 pt-20 pb-8 max-w-full',
              'before:absolute before:inset-0 before:z-0 border-l-2 border-black left-1/2 before:w-[1px]',
            )}
          >
            {data?.map((item) => (
              <div
                key={item.id}
                className={classNames(
                  'relative z-10 -mt-32 md:-mt-16 px-4 md:px-6 w-48 md:w-96 even:-ml-[12.2rem] md:even:-ml-[24.2rem]',
                  'before:absolute before:w-3 before:h-3 before:bg-black before:rounded-full before:border before:border-white',
                  'before:top-3 before:even:left-[calc(100%-4px)] before:odd:-left-[7px] z-20',
                  'after:absolute after:w-4 md:after:w-6 after:h-1 after:border-t after:border-dashed after:border-black',
                  'after:top-[18px] after:even:left-[calc(94%-5px)] md:after:even:left-[calc(94%-1px)] after:odd:-left-0 z-20',
                )}
              >
                <Link
                  href={`/comics/${item.properties.CID.number}-${slugify(
                    getPageNamePlainText(item),
                  )}`}
                  className={classNames(
                    'relative z-10 block border border-black rounded-lg overflow-hidden',
                    'hover:shadow-lg',
                  )}
                >
                  <div className="p-2 text-center text-sm md:block bg-[#E3E3E3] border-b border-black">
                    {formatDate(item.created_time)}
                  </div>
                  <p className="p-4 text-semibold flex flex-wrap md:flex-nowrap items-center justify-between">
                    <NotionRichText
                      items={item.properties.Name.title as any}
                      className="uppercase text-base"
                    />
                    <img
                      alt="preview"
                      src={
                        shouldReload === 'full'
                          ? '/assets/neko-3.png'
                          : getFileURL(item.properties.Photo.files[0])
                      }
                      className={classNames(
                        'w-full h-full mt-2 md:w-24 md:h-24 md:mt-0 ml-0 md:ml-2',
                        {
                          'animate-pulse': shouldReload === 'full',
                        },
                      )}
                    />
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}
