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
        className="flex relative z-10 flex-col justify-center items-center w-full group"
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
      className="flex relative z-10 flex-col justify-center items-center w-full cursor-not-allowed group"
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
  const isOldest = `/${data?.oldestSlug}` === router.asPath

  return (
    <div
      className={classNames(
        'border-dashboard-gray-3 p-4 md:p-6 z-10 bg-white-pure',
        'fixed w-full bottom-0 left-0 right-0 border-t md:border-t-0', // mobile
        'md:sticky md:top-0 mt-4 border-b-0 md:border-b', // desktop
      )}
    >
      <div className="flex justify-between items-center mx-auto space-x-2 max-w-4xl">
        <div className="w-1/3">
          <Link
            href={
              data?.oldestSlug ? `/${data?.oldestSlug}` : '/why-we-have-pay-tax'
            }
            key="HOWDY, UNIVERSE!"
            className="flex relative z-10 flex-col justify-center items-center group"
          >
            <p
              className={classNames('text-center', {
                'underline md:no-underline': isOldest,
              })}
            >
              HOWDY, UNIVERSE!
            </p>
            <div className="relative h-[35px] w-[35px]">
              <Image
                src={Neko0}
                alt="all commic"
                className="absolute inset-0 opacity-100 group-hover:opacity-0"
                width={35}
                height={35}
              />
              <Image
                src={Neko0Gif}
                alt="all commic"
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                width={35}
                height={35}
              />
            </div>
            <Image
              src="/assets/select-circle.svg"
              alt="all comics"
              width={195}
              height={72}
              className={classNames(
                'absolute scale-110 opacity-0 md:opacity-100 group-hover:block',
                {
                  hidden: !isOldest,
                  block: isOldest,
                },
              )}
            />
          </Link>
        </div>
        <div className="w-1/3">
          <div className="flex relative justify-center items-center group">
            <NavLink key="prev" href={prevID ? `/${prevID}` : undefined}>
              <p className="opacity-0 select-none">Prev</p>
              <Image src={ArrowLeft} alt="prev" width={30} height={10} />
            </NavLink>

            <button
              type="button"
              key="random"
              className="flex relative z-10 flex-col justify-center items-center cursor-pointer group"
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
                  className="absolute inset-0 opacity-100 group-hover:opacity-0"
                  width={35}
                  height={35}
                />
                <Image
                  src={Neko1Gif}
                  alt="all commic"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
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
              alt="all comics"
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
              <p
                className={classNames('text-center', {
                  'underline md:no-underline': isNewest,
                })}
              >
                Fresh out of the oven
              </p>
              <div className="relative h-[35px] w-[35px]">
                <Image
                  src={Neko2}
                  alt="all commic"
                  className="absolute inset-0 opacity-100 group-hover:opacity-0"
                  width={35}
                  height={35}
                />
                <Image
                  src={Neko2Gif}
                  alt="all commic"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  width={35}
                  height={35}
                />
              </div>
              <Image
                src="/assets/select-circle.svg"
                alt="all comics"
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
