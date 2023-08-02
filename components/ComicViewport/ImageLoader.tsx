import { sleep } from '@dwarvesf/react-utils'
import { useRouter } from 'next/router'
import { memo, useEffect, useRef } from 'react'
import { fetcher } from '~utils/fetcher'

function ImageLoader({
  src,
  className,
}: {
  src: string
  className?: string
  alt?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    var image = new Image()
    image.onload = function (e: any) {
      if (this && 'naturalHeight' in this && 'naturalWidth' in this) {
        // @ts-ignore
        if (this.naturalHeight + this.naturalWidth === 0) {
          this.onerror?.(e)
          return
        }
        // @ts-ignore
      } else if (this.width + this.height == 0) {
        this.onerror?.(e)
        return
      }

      // append image
      ref.current?.replaceChildren(image)
    }

    image.onerror = async function () {
      try {
        await fetcher.post(`/api/revalidate`, { path: router.asPath })
        await sleep(1000)
        router.reload()
      } catch (err) {
        console.error(`[ERROR]`, err)
      }
    }

    image.src = src
  }, [src])

  return (
    <div ref={ref} className={className}>
      <img
        src="/assets/neko-4.png"
        className="animate-pulse mx-auto mt-12 w-24"
        alt=""
      />
    </div>
  )
}

export default memo(ImageLoader)
