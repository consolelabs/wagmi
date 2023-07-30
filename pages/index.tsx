import { GetServerSideProps } from 'next'
import { Layout } from '~components/layout'
import { SEO } from '~components/layout/seo'
import ComicViewport from '~components/ComicViewport'

import NotionClient from '~utils/notion'
import { IComic } from '~utils/notion/types'

export const getStaticProps: GetServerSideProps = async (ctx) => {
  const data = await NotionClient.getLatestComic()

  return {
    props: {
      ...data,
    },
    revalidate: 300, // 5 minutes, notion image cache is 1 hour
  }
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
    <div className="relative overflow-hidden">
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
