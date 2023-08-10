import { memo } from 'react'

function Tag({ tag }: { tag: string }) {
  return (
    <div
      className="relative h-6 inline-flex justify-center items-center bg-[#E3E3E3] hover:bg-opacity-80"
      style={{
        clipPath: 'polygon(92% 0, 100% 50%, 92% 100%, 0% 100%, 6% 50%, 0% 0%)',
      }}
    >
      <p className="relative px-3 pt-0.5 z-10 text-sm uppercase text-[#72767D]">
        {tag}
      </p>
    </div>
  )
}

export default memo(Tag)
