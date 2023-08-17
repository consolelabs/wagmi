import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, memo } from 'react'
import useSWR from 'swr'
import {
  ArrowLeft,
  ArrowRight,
  Neko0,
  Neko0Gif,
  Neko1,
  Neko1Gif,
  Neko2,
  Neko2Gif,
} from '~components/icons/images'
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
  nextID,
}: {
  prevID?: string
  nextID?: string | null
  maxID?: number
}) {
  const router = useRouter()
  const { slug = '' } = router.query
  const { data } = useSWR(['/api/random?page_id=', slug], () =>
    fetcher.get<{ slug: string; newestSlug: string; oldestSlug: string }>(
      `/api/random?page_id=${slug}`,
    ),
  )
  const isNewest = `/${data?.newestSlug}` === router.asPath

  return (
    <div
      className={classNames(
        'border-dashboard-gray-3 p-4 md:p-6 z-10 bg-white-pure',
        'fixed w-full bottom-0 left-0 right-0 border-t md:border-t-0', // mobile
        'md:sticky md:top-0 mt-4 border-b-0 md:border-b', // desktop
      )}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between space-x-2">
        <div className="w-1/3">
          <Link
            href={
              data?.oldestSlug ? `/${data?.oldestSlug}` : '/why-we-have-pay-tax'
            }
            key="HOWDY, UNIVERSE!"
            className="relative z-10 group flex flex-col items-center justify-center"
          >
            <p className="text-center">HOWDY, UNIVERSE!</p>
            <div className="relative h-[35px] w-[35px]">
              <Image
                src={Neko0}
                alt="all commic"
                className="opacity-100 group-hover:opacity-0 absolute inset-0"
                width={35}
                height={35}
              />
              <Image
                src={Neko0Gif}
                alt="all commic"
                className="opacity-0 group-hover:opacity-100 absolute inset-0"
                width={35}
                height={35}
              />
            </div>
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
            <NavLink key="prev" href={prevID ? `/${prevID}` : undefined}>
              <p className="opacity-0 select-none">Prev</p>
              <Image src={ArrowLeft} alt="prev" width={30} height={10} />
            </NavLink>

            <button
              type="button"
              key="random"
              className="relative z-10 flex flex-col items-center justify-center cursor-pointer group"
              disabled={!data?.slug}
              onClick={() => {
                router.push(`/${data?.slug}`)
              }}
            >
              <p>RANDOM</p>
              <div className="relative h-[35px] w-[35px]">
                <Image
                  src={Neko1}
                  alt="all commic"
                  className="opacity-100 group-hover:opacity-0 absolute inset-0"
                  width={35}
                  height={35}
                />
                <Image
                  src={Neko1Gif}
                  alt="all commic"
                  className="opacity-0 group-hover:opacity-100 absolute inset-0"
                  width={35}
                  height={35}
                />
              </div>
            </button>

            <NavLink key="next" href={nextID ? `/${nextID}` : undefined}>
              <p className="opacity-0 select-none">Next</p>
              <Image src={ArrowRight} alt="next" width={30} height={10} />
            </NavLink>
            <Image
              src="/assets/select-circle.svg"
              alt="all commic"
              width={195}
              height={72}
              className={classNames(
                'absolute opacity-0 md:opacity-100 scale-110 hidden group-hover:block',
              )}
            />
          </div>
        </div>
        <div className="w-1/3">
          <NavLink href={data?.newestSlug ? `/${data?.newestSlug}` : undefined}>
            <>
              <p className="text-center">Fresh out of the oven</p>
              <div className="relative h-[35px] w-[35px]">
                <Image
                  src={Neko2}
                  alt="all commic"
                  className="opacity-100 group-hover:opacity-0 absolute inset-0"
                  width={35}
                  height={35}
                />
                <Image
                  src={Neko2Gif}
                  alt="all commic"
                  className="opacity-0 group-hover:opacity-100 absolute inset-0"
                  width={35}
                  height={35}
                />
              </div>
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
