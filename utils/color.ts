const notionColorMap = {
  default: {
    background: 'rgba(206,205,202,0.5)',
    color: '#2F2E2D',
  },
  gray: {
    background: 'rgba(155,154,151,0.4)',
    color: '#2F2E2D',
  },
  brown: {
    background: 'rgba(140,46,0,0.2)',
    color: '#2F2E2D',
  },
  orange: {
    background: 'rgba(245,93,0,0.2)',
    color: '#2F2E2D',
  },
  yellow: {
    background: 'rgba(233,168,0,0.2)',
    color: '#2F2E2D',
  },
  green: {
    background: 'rgba(0,135,107,0.2)',
    color: '#2F2E2D',
  },
  blue: {
    background: 'rgba(0,120,223,0.2)',
    color: '#2F2E2D',
  },
  purple: {
    background: 'rgba(103,36,222,0.2)',
    color: '#2F2E2D',
  },
  pink: {
    background: 'rgba(221,0,129,0.2)',
    color: '#2F2E2D',
  },
  red: {
    background: 'rgba(255,0,26,0.2)',
    color: '#2F2E2D',
  },
}

export function getNotionColor(color: string) {
  const key = color.toLowerCase() as keyof typeof notionColorMap
  if (notionColorMap[key]) {
    return notionColorMap[key]
  }

  return notionColorMap.default
}
