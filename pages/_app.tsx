import '@fontsource/inter/900.css'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { StrictMode } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import 'nprogress/nprogress.css'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'

import classNames from 'classnames'

const TopProgressBar = dynamic(() => import('~components/layout/nprogress'), {
  ssr: false,
})

const BabyDoll = localFont({
  src: '../assets/Baby Doll.otf',
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function handleCancelRendering(e: any) {
  if (!e.cancelled) throw e
}

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <main
      className={classNames('relative overflow-hidden', BabyDoll.className)}
    >
      {getLayout(<Component {...pageProps} />)}
    </main>
  )
}

export default function App(props: AppPropsWithLayout) {
  return (
    <StrictMode>
      <TopProgressBar />
      <InnerApp {...props} />
    </StrictMode>
  )
}
