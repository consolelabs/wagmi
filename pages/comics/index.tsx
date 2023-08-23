import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Layout } from '~components/layout'
import { SEO } from '~components/layout/seo'
import { getNotionColor } from '~utils/color'
import { formatDate } from '~utils/time'
import { IComicMetadata, getAllCommics } from '~utils/mdx'
import { generateRssFeed } from '~utils/generateRSSFeed'

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllCommics()
  await generateRssFeed(data)
  return {
    props: {
      data: data.map((item) => item.data),
    },
    revalidate: 10,
  }
}

export default function Page({
  data: initialData,
}: {
  data: IComicMetadata[]
}) {
  const router = useRouter()

  const tag = router.query.tag as string | undefined

  const data = useMemo(() => {
    // filter by tag
    if (tag) {
      return initialData.filter((item) => {
        return item.tags.includes(tag as string)
      })
    }
    return initialData
  }, [initialData, tag])

  return (
    <div className="relative">
      <Layout>
        <SEO
          title="Comic list"
          description="Indie financial webcomic to get through life-bonkers"
          twitterCardLarge={false}
        />
        <div className="flex overflow-hidden relative flex-col justify-between px-6 mx-auto mt-24 max-w-4xl md:px-12 md:mt-12 body-block">
          <h1 className="relative z-20 text-3xl font-bold text-center font-[YanoneKaffeesatz-Bold]">
            All comics
          </h1>
          {tag && (
            <div className="flex relative z-20 items-center mx-auto mt-4">
              <div className="mr-2">Filtered by</div>
              <Link
                href={`/comics`}
                className="flex gap-1 justify-center items-center py-1 px-2 text-sm text-white rounded-lg border-none hover:cursor-pointer group"
                style={{ ...getNotionColor(tag) }}
              >
                <Icon
                  icon="heroicons-tag-solid"
                  className="block w-3 h-3 text-white group-hover:hidden"
                  style={{
                    ...getNotionColor(tag),
                    background: 'none',
                  }}
                />
                <Icon
                  icon="heroicons-x-mark-solid"
                  className="hidden w-3 h-3 text-white group-hover:block"
                  style={{
                    ...getNotionColor(tag),
                    background: 'none',
                  }}
                />
                <span className="font-normal">{tag}</span>
              </Link>
            </div>
          )}
          <p className="mt-8 text-3xl text-center">
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
                key={item.slug}
                className={classNames(
                  'relative z-10 -mt-12 md:-mt-16 px-4 md:px-6 w-48 md:w-96 even:-ml-[12.2rem] md:even:-ml-[24.2rem]',
                  'before:absolute before:w-3 before:h-3 before:bg-black before:rounded-full before:border before:border-white',
                  'before:top-3 before:even:left-[calc(100%-4px)] before:odd:-left-[7px] z-20',
                  'after:absolute after:w-4 md:after:w-6 after:h-1 after:border-t after:border-dashed after:border-black',
                  'after:top-[18px] after:even:left-[calc(94%-5px)] md:after:even:left-[calc(94%-1px)] after:odd:-left-0 z-20',
                )}
              >
                <Link
                  href={item.slug}
                  className={classNames(
                    'relative z-10 block border border-black rounded-lg overflow-hidden',
                    'hover:shadow-lg',
                  )}
                >
                  <div className="p-2 text-center text-sm md:block bg-[#E3E3E3] border-b border-black">
                    {formatDate(item.date)}
                  </div>
                  <div className="flex flex-wrap justify-between items-center p-4 text-base uppercase md:flex-nowrap text-semibold">
                    <p>{item.title}</p>
                    <div className="overflow-hidden mt-2 ml-0 w-full h-24 md:mt-0 md:ml-2 md:w-24">
                      <img
                        alt="preview"
                        src={item.images[0]}
                        className={classNames('w-full object-cover')}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}
