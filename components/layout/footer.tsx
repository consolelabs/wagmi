import Image from 'next/image'
import { ConsolelabsBlack, Neko5 } from '~components/icons/images'

export const Footer = () => (
  <footer className="pt-12 pb-32 md:pb-12 px-2 mt-auto text-center m-auto text-sm md:text-base">
    <div className="h-1 border-b border-dashboard-gray-3 my-6 max-w-4xl m-auto" />
    <Image
      src={Neko5}
      alt="hug sticker"
      width={107}
      height={107}
      className="m-auto"
    />
    <div className="space-x-1 flex flex-wrap items-center justify-center mt-2">
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
      <div>the comic for investors who want to make the big bucks.</div>
    </div>
    <div>Copyright © 2023 Console Labs, All rights reserved</div>
  </footer>
)
