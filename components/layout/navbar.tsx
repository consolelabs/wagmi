import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { ConsolelabsWhite, Neko4 } from '~components/icons/images'

const NavLink = (props: any) => {
  return (
    <Link
      href={props.href}
      className={classNames(
        'flex items-center py-2 px-3 bg-transparent rounded-md group hover:text-mochi-500',
        props.className,
      )}
    >
      {props.children}
    </Link>
  )
}

const NavLinks = ({
  className,
  pathname,
}: {
  className: string
  pathname: string
}) => (
  <div
    className={classNames([
      'flex items-center justify-end space-x-2',
      className,
    ])}
  >
    <NavLink
      href="/comics"
      className={classNames({ 'text-mochi-500': pathname === '/comics' })}
    >
      Comic List
    </NavLink>
    <NavLink
      href="/about"
      className={classNames({ 'text-mochi-500': pathname === '/about' })}
    >
      About
    </NavLink>
  </div>
)

export const Navbar = () => {
  const { asPath } = useRouter()

  return (
    <Fragment>
      <nav className="fixed top-0 right-0 left-0 z-50 md:relative bg-white-pure">
        <div className="flex gap-y-5 items-center py-3 px-6 mx-auto max-w-7xl shadow-md md:py-5 md:px-12 md:shadow-none">
          <Link className="text-3xl font-[YanoneKaffeesatz-Bold]" href="/">
            WAGMI
          </Link>
          <NavLinks className="flex-1" pathname={asPath} />
        </div>
        <div className="hidden flex-col justify-center items-center h-auto text-lg text-white uppercase bg-black md:flex md:flex-row md:h-10 font-[YanoneKaffeesatz-Bold] tracking-[0.5px]">
          <div className="">A not financial advice webcomic</div>
          <Image
            src={Neko4}
            height={72}
            width={72}
            alt="cry sticker"
            className="mx-0 w-12 h-12 md:mx-6 md:h-[72px] md:w-[72px]"
          />
          <div className="inline-flex items-center">
            brought to the screen by
            <a
              href="https://console.so/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center"
            >
              <Image
                src={ConsolelabsWhite}
                height={18}
                width={18}
                alt="console lab logo sticker"
                className="mx-1"
              />
              <span>console labs</span>
            </a>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}
