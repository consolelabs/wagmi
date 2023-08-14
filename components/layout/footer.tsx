import Image from 'next/image'
import { SOCIAL_LINKS } from '~constants'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export const Footer = () => (
  <footer className="py-12 mt-auto text-center m-auto">
    <Image
      src="/assets/hug.png"
      alt="hug sticker"
      width={107}
      height={107}
      className="m-auto"
    />
    <div className="flex gap-4 items-center text-base uppercase justify-center">
      follow us:
      <a href="https://console.so/" target="_blank" rel="noreferrer">
        <Image
          src="/consolelab.svg"
          height={64}
          width={64}
          alt="console lab logo sticker"
          className="mx-0 h-4 w-full"
        />
      </a>
    </div>
    <div className="h-1 border-b border-dashboard-gray-3 my-6 max-w-4xl m-auto" />
    <div className="space-y-6">
      <div className="font-[YanoneKaffeesatz-Bold] text-2xl">
        Level up your community. For Free ✨
      </div>
      <div>
        <Link href="https://mochi.gg/">
          <button className="border-2 border-black border-b-4 rounded-xl py-2 px-4">
            Learn more
          </button>
        </Link>
      </div>
      <div>Copyright © 2022+ Console Labs, All rights reserved</div>
    </div>
  </footer>
)
