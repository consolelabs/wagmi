import { Icon } from '@iconify/react'
import classNames from 'classnames'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Layout } from '~components/layout'
import { CONFIG, SEO } from '~components/layout/seo'
import { getNotionColor } from '~utils/color'
import { formatDate } from '~utils/time'
import { IComicMetadata, getAllCommics } from '~utils/mdx'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await getAllCommics()

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
        <SEO title={['Comic list', CONFIG.title].join(' - ')} />
        <div className="mt-24 md:mt-12 flex flex-col justify-between relative body-block px-6 md:px-12 max-w-4xl mx-auto overflow-hidden">
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
                  <div className="p-4 text-semibold flex flex-wrap md:flex-nowrap items-center justify-between uppercase text-base">
                    <p>{item.title}</p>
                    <div className="w-full h-24 mt-2 md:w-24 md:mt-0 ml-0 md:ml-2 overflow-hidden">
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
