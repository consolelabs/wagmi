import React from 'react'
import { cva } from 'class-variance-authority'
import Link from 'next/link'

type Appearance = 'primary' | 'secondary' | 'tertiary' | 'discord'

type Props = {
  appearance?: Appearance
  children: React.ReactNode
  href?: string
  openNewTab?: boolean
} & React.ButtonHTMLAttributes<HTMLElement>

const button = cva(
  ['flex gap-x-2 items-center rounded-lg px-4 py-2 font-semibold'],
  {
    variants: {
      appearance: {
        primary: ['text-white', 'bg-mochi'],
        secondary: ['text-mochi', 'bg-white'],
        tertiary: ['text-mochi bg-mochi bg-opacity-[15%]'],
        discord: ['text-white', 'bg-discord'],
      },
    },
    defaultVariants: {
      appearance: 'primary',
    },
  },
)

export const Button = ({
  appearance,
  children,
  className,
  href,
  openNewTab,
  ...props
}: Props) => {
  if (href && openNewTab) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={button({
          className,
          appearance,
        })}
      >
        {children}
      </a>
    )
  }
  if (href && !openNewTab) {
    return (
      <Link
        {...props}
        href={href}
        prefetch
        className={button({
          className,
          appearance,
        })}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      {...props}
      className={button({
        className,
        appearance,
      })}
    >
      {children}
    </button>
  )
}
