import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, memo, useEffect, useState } from 'react'
import { fetcher } from '~utils/fetcher'

const NavLink = (props: { href?: string; children: ReactNode }) => {
  if (props.href) {
    return (
      <Link
        href={props.href}
        key="prev"
        className="relative w-full z-10 group flex flex-col items-center justify-center"
      >
        {props.children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      key="prev-disabled"
      disabled
      className="relative w-full z-10 group flex flex-col items-center justify-center cursor-not-allowed"
    >
      {props.children}
    </button>
  )
}

function Navigation({
  prevID,
  nextID, // maxID,
}: {
  prevID?: string
  nextID?: string | null
  maxID?: number
}) {
  const router = useRouter()
  const { slug = '' } = router.query
  const [nextSlug, setNextSlug] = useState<string | null>(null)
  const [newestSlug, setNewestSlug] = useState<string | null>(null)
  const isNewest = `/comics/${newestSlug}` === router.asPath

  useEffect(() => {
    fetcher
      .get<{ slug: string; newestSlug: string }>(`/api/random?page_id=${slug}`)
      .then(async (res) => {
        if (res) {
          setNextSlug(res.slug)
          setNewestSlug(res.newestSlug)
        }
      })
  }, [slug])

  return (
    <div className="sticky top-0 mt-4 border-b border-dashboard-gray-4 p-4 md:p-6 z-10 bg-white-pure">
      <div className="max-w-4xl mx-auto flex items-center justify-between space-x-2">
        <div className="w-1/3">
          <Link
            href="/comics"
            key="prev"
            className="relative z-10 group flex flex-col items-center justify-center"
          >
            <p className="text-center">HOWDY, UNIVERSE!</p>
            <Image
              src="/assets/neko-0.png"
              alt="all commic"
              className="block group-hover:hidden"
              width={35}
              height={35}
            />
            <Image
              src="/assets/neko-0.gif"
              alt="all commic"
              className="hidden group-hover:block"
              width={35}
              height={35}
            />
            <Image
              src="/assets/select-circle.svg"
              alt="all commic"
              width={195}
              height={72}
              className={classNames(
                'absolute scale-110 opacity-0 md:opacity-100 group-hover:block',
                {
                  hidden: router.asPath !== '/comics',
                  block: router.asPath === '/comics',
                },
              )}
            />
          </Link>
        </div>
        <div className="w-1/3">
          <div className="relative group flex items-center justify-center">
            <NavLink key="prev" href={prevID ? `/comics/${prevID}` : undefined}>
              <p className="opacity-0 select-none">Prev</p>
              <Image
                src="/assets/arrow-left.svg"
                alt="prev"
                width={30}
                height={10}
              />
            </NavLink>

            <button
              type="button"
              key="random"
              className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
              disabled={!nextSlug}
              onClick={() => {
                router.push(`/comics/${nextSlug}`)
              }}
            >
              <p>RANDOM</p>
              <Image
                src="/assets/neko-1.png"
                alt="all commic"
                className="block group-hover:hidden"
                width={35}
                height={35}
              />
              <Image
                src="/assets/neko-1.gif"
                alt="all commic"
                className="hidden group-hover:block"
                width={35}
                height={35}
              />
            </button>

            <NavLink key="next" href={nextID ? `/comics/${nextID}` : undefined}>
              <p className="opacity-0 select-none">Next</p>
              <Image
                src="/assets/arrow-right.svg"
                alt="next"
                width={30}
                height={10}
              />
            </NavLink>
            <Image
              src="/assets/select-circle.svg"
              alt="all commic"
              width={195}
              height={72}
              className={classNames(
                'absolute opacity-0 md:opacity-100 scale-110 group-hover:block',
                {
                  hidden: isNewest || !router.asPath.includes('/comics/'),
                  block: !isNewest && router.asPath.includes('/comics/'),
                },
              )}
            />
          </div>
        </div>
        <div className="w-1/3">
          <NavLink href={newestSlug ? `/comics/${newestSlug}` : undefined}>
            <>
              <p className="text-center">Fresh out of the oven</p>
              <Image
                src="/assets/neko-2.png"
                alt="all commic"
                className="block group-hover:hidden"
                width={35}
                height={35}
              />
              <Image
                src="/assets/neko-2.gif"
                alt="all commic"
                className="hidden group-hover:block"
                width={35}
                height={35}
              />
              <Image
                src="/assets/select-circle.svg"
                alt="all commic"
                width={195}
                height={72}
                className={classNames(
                  'absolute opacity-0 md:opacity-100 scale-110 group-hover:block',
                  {
                    hidden: !isNewest,
                    block: isNewest,
                  },
                )}
              />
            </>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default memo(Navigation)
