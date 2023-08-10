import { GetStaticProps } from 'next'
import slugify from 'slugify'
import { Layout } from '~components/layout'
import { SEO } from '~components/layout/seo'
import ComicViewport from '~components/ComicViewport'
import NotionClient from '~utils/notion'
import { IComic } from '~utils/notion/types'
import { getPageNamePlainText } from '~utils/notion/utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const data = await NotionClient.getComicByID(ctx.params?.slug as string)

    return {
      props: {
        ...data,
      },
      revalidate: 10,
    }
  } catch (err) {
    console.error(err)

    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const pages: Array<IComic> = []
  let cursor: string | undefined = undefined
  while (true) {
    const res = await NotionClient.getComics(50, cursor)
    pages.push(...res.results)
    if (!res.has_more) {
      break
    }
    cursor = res.next_cursor || undefined
  }

  // Get the paths we want to pre-render based on posts
  const paths = pages.map((page) => ({
    params: {
      slug: [
        page.properties.CID.number,
        slugify(getPageNamePlainText(page)),
      ].join('-'),
    },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default function IndexPage({
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
    <div className="relative">
      <Layout>
        <SEO />
        <div className="relative w-screen">
          <ComicViewport
            data={data}
            maxID={maxID}
            prevID={prevID}
            nextID={nextID}
          />
        </div>
      </Layout>
    </div>
  )
}
