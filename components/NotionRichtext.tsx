import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC, Fragment } from 'react'
import cn from 'classnames'

interface Props {
  items?: RichTextItemResponse[]
  className?: string
}

const NotionRichText: FC<Props> = ({ items = [], className: cls }) => {
  return (
    <>
      {items.map((richText, i) => {
        const className = cn(cls, {
          'font-bold': richText.annotations.bold,
          italic: richText.annotations.italic,
          underline: richText.annotations.underline,
          'line-through': richText.annotations.strikethrough,
        })
        if (richText.href) {
          return (
            <a
              key={i}
              href={richText.href}
              className={cn(className, 'underline')}
              target="_blank"
              rel="noopener noreferer noreferrer"
            >
              {richText.plain_text}
            </a>
          )
        }
        return (
          <span key={i} className={className}>
            {richText.plain_text.split('\n').map((text, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {text}
              </Fragment>
            ))}
          </span>
        )
      })}
    </>
  )
}

export default NotionRichText
