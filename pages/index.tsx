import { GetServerSideProps } from 'next'
import { Layout } from '~components/layout'
import { CONFIG, SEO } from '~components/layout/seo'
import ComicViewport from '~components/ComicViewport'

import { IComicMetadata, getNewestFile } from '~utils/mdx'

export const getStaticProps: GetServerSideProps = async (ctx) => {
  const comicData = await getNewestFile()
  return {
    props: { ...comicData },
    revalidate: 10,
  }
}

export default function IndexPage({
  data,
  prevPage,
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
        />
        <div className="relative w-screen z-10 mt-20 md:mt-0">
          <ComicViewport data={data} prevID={prevPage} />
        </div>
      </Layout>
    </div>
  )
}
