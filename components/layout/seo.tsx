import Head from 'next/head'
import { PAGES } from '~constants'
import { HOME_URL } from '~envs'

interface Props {
  title?: string
  tailTitle?: boolean
  description?: string
  image?: string
  imgHeight?: string
  imgWidth?: string
  url?: string
  twitterCardLarge?: boolean
}

export const CONFIG = {
  title: PAGES.HOME.title,
  description:
    'WAGMI by Console Labs - A collection of tips, tricks, and funny stories to help you become master of personal finance',
  url: HOME_URL,
  image: `/thumbnail.png`,
}

export const SEO = ({
  // imgHeight = '128',
  // imgWidth = '128',
  title = CONFIG.title,
  tailTitle = false,
  description = CONFIG.description,
  url = HOME_URL,
  image,
  twitterCardLarge = true,
}: Props) => (
  <Head>
    <title>{title + (tailTitle ? ` — ${CONFIG.title}` : '')}</title>

    <meta name="title" content={title} />
    <meta name="description" content={description} />

    <meta property="og:site_name" content="WAGMI comics by Console" />
    <meta property="og:type" content="object" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image || CONFIG.image} />

    <meta
      property="twitter:card"
      content={twitterCardLarge ? 'summary_large_image' : 'summary'}
    />
    <meta property="twitter:domain" content={HOME_URL} />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image || CONFIG.image} />
  </Head>
)
