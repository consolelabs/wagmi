import { GetStaticProps } from 'next'
import { Layout } from '~components/layout'
import { CONFIG, SEO } from '~components/layout/seo'
import ComicViewport from '~components/ComicViewport'
import { IComicMetadata, getFileBySlug, getFilePaths } from '~utils/mdx'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const comicData = await getFileBySlug(params?.slug as string)
  return {
    props: comicData,
  }
}

export const getStaticPaths = async () => {
  const { pathsWithoutID } = getFilePaths()

  return {
    paths: pathsWithoutID.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default function IndexPage({
  data,
  prevPage,
  nextPage,
}: {
  data: IComicMetadata
  maxID: number
  prevPage: string
  nextPage?: string | null
}) {
  return (
    <div className="relative">
      <Layout>
        <SEO
          title={data.title}
          description={data.description}
          image={data.images[0]}
          url={`${CONFIG.url}/${data.slug}`}
        />
        <div className="relative w-screen z-10 mt-20 md:mt-0">
          <ComicViewport data={data} prevID={prevPage} nextID={nextPage} />
        </div>
      </Layout>
    </div>
  )
}
