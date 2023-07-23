import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover } from '~components/Popover'
import { SOCIAL_LINKS } from '~constants'
import { logo } from '~utils/image'
import { Icon } from '@iconify/react'

const NavLink = (props: any) => {
  if (!props.href) {
    return (
      <div className="flex items-center py-2 px-3 bg-transparent rounded-md group">
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <Icon
          icon="heroicons:arrow-small-right-20-solid"
          className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi"
        />
      </div>
    )
  }
  return (
    <Link
      href={props.href}
      className="flex items-center py-2 px-3 bg-transparent rounded-md group"
    >
      <>
        <span className="p-1 mr-2 bg-gray-200 rounded transition-all duration-100 ease-out group-hover:text-mochi group-hover:bg-mochi-50">
          {props.icon}
        </span>
        <div className="mr-4">{props.children}</div>
        <Icon
          icon="heroicons:arrow-small-right-20-solid"
          className="ml-auto w-5 h-5 opacity-0 transition-all duration-100 ease-out translate-x-1/2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-mochi"
        />
      </>
    </Link>
  )
}

const NavLinks = ({ className }: { className: string }) => (
  <div
    className={['flex flex-wrap items-stretch gap-y-2', className].join(' ')}
  >
    <Popover
      trigger={<span className="text-sm font-semibold">Support</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={<Icon icon="heroicons:heart-20-solid" className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORD}
      >
        Support Server
      </NavLink>
    </Popover>
    <Popover
      trigger={<span className="text-sm font-semibold">Credibility</span>}
      panelClassname="p-2 bg-white flex flex-col whitespace-nowrap text-sm font-semibold text-foreground-secondary"
    >
      <NavLink
        icon={
          <Icon icon="heroicons:arrow-up-circle-20-solid" className="w-5 h-5" />
        }
        href={SOCIAL_LINKS.TOP_GG}
      >
        Vote on Top.gg
      </NavLink>
      <NavLink
        icon={<Icon icon="ic:baseline-discord" className="w-5 h-5" />}
        href={SOCIAL_LINKS.DISCORBOTLIST}
      >
        Vote on Discordbotlist.com
      </NavLink>
    </Popover>
  </div>
)

export const Navbar = () => (
  <Fragment>
    <nav className="relative z-20 bg-transparent">
      <div className="flex flex-wrap gap-y-5 items-center py-5 px-6 mx-auto max-w-7xl md:px-12">
        <Link className="flex gap-x-3 items-center" href="/">
          <>
            <Image
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              className="block rounded-full"
            />
            <span className="text-xl font-black uppercase text-foreground">
              Mochi<span className="text-mochi">.</span>
            </span>
          </>
        </Link>
        <NavLinks className="flex order-2 gap-x-10 justify-center mx-auto md:order-1 md:justify-start md:mx-0 md:ml-auto basis-full md:basis-[auto]" />
      </div>
    </nav>
  </Fragment>
)
