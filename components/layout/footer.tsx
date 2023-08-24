import Image from 'next/image'
import { ConsolelabsBlack, Neko5 } from '~components/icons/images'
import { Icon } from '@iconify/react'
import { SOCIAL_LINKS } from '~constants'

export const Footer = () => (
  <footer className="px-2 pt-12 pb-32 m-auto mt-auto text-sm text-center md:pb-12 md:text-base">
    <div className="flex gap-4 items-center text-base uppercase justify-center">
      follow us:
      <a href="/rss.xml" target="_blank" rel="noreferrer">
        <Icon icon="mdi:rss" className="w-4 h-4 text-black" />
      </a>
      <a href={SOCIAL_LINKS.TWITTER_LINK} target="_blank" rel="noreferrer">
        <Icon icon="mdi:twitter" className="w-4 h-4 text-black" />
      </a>
      <a href={SOCIAL_LINKS.TELEGRAM} target="_blank" rel="noreferrer">
        <Icon icon="ic:baseline-telegram" className="w-4 h-4 text-black" />
      </a>
      <a href={SOCIAL_LINKS.GITHUB_LINK} target="_blank" rel="noreferrer">
        <Icon icon="simple-icons:github" className="w-4 h-4 text-black" />
      </a>
    </div>
    <div className="m-auto my-6 max-w-4xl h-1 border-b border-dashboard-gray-3" />
    <Image
      src={Neko5}
      alt="hug sticker"
      width={107}
      height={107}
      className="m-auto"
    />
    <div className="flex flex-wrap justify-center items-center mt-2 space-x-1">
      <div className="inline-flex items-center">
        <span>Built with</span>
        <Image
          src={ConsolelabsBlack}
          alt="consolelab logo"
          width={16}
          height={16}
          className="mx-1"
        />
        <span>Console Labs,</span>
      </div>
      <div>indie financial webcomic to get through life-bonkers</div>
    </div>
    <div>Copyright © 2023 Console Labs, All rights reserved</div>
  </footer>
)
