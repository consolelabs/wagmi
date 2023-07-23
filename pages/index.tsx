import { GetServerSideProps } from 'next'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import ComicViewport from '~components/ComicViewport'

import NotionClient from '~utils/notion'
import { IComic } from '~utils/notion/types'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await NotionClient.getLatestComic()

  return {
    props: {
      ...data,
    },
  }
}

export default function IndexPage({
  data,
  nextRandomID,
  prevID,
  nextID,
}: {
  data: IComic
  nextRandomID: number
  prevID: string
  nextID?: string | null
}) {
  return (
    <div className="relative overflow-hidden">
      <Layout>
        <SEO />
        <div className="lg:mt-40 flex flex-col-reverse lg:flex-row justify-between relative body-block px-6 md:px-12">
          <ComicViewport
            data={data}
            nextRandomID={nextRandomID}
            prevID={prevID}
            nextID={nextID}
          />
        </div>
      </Layout>
    </div>
  )
}
