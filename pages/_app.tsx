import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/700.css'
import dynamic from 'next/dynamic'
import { StrictMode } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/global.css'
import '~styles/nprogress.css'
import '../styles/tos.css'

import { Toaster } from 'sonner'
import { RingsBackground } from '~components/RingsBackground'
import Image from 'next/image'
import { heroBg } from '~utils/image'

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
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
    <main className="relative">
      <div className="w-full min-h-screen aspect-auto absolute inset-0 z-0">
        <Image src={heroBg} alt="" className="w-screen" />
      </div>
      <div className="absolute -right-12 -top-12 w-1/2 max-w-3xl h-[600px]">
        <RingsBackground />
      </div>
      {getLayout(<Component {...pageProps} />)}
    </main>
  )
}

export default function App(props: AppPropsWithLayout) {
  return (
    <StrictMode>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className: 'w-full',
        }}
      />
      <TopProgressBar />
      <InnerApp {...props} />
    </StrictMode>
  )
}
