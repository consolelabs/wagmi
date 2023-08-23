import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data')

export interface IComicMetadata {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  images: string[]
}

export function getFilePaths() {
  const paths = fs
    .readdirSync(DB_PATH)
    .filter((path: string) => /\.mdx?$/.test(path))
    .map((path: string) => path.replace(/\.mdx?$/, ''))

  const pathsMap: Record<string, number> = paths.reduce(
    (acc: Record<string, number>, path: string, idx: number) => ({
      ...acc,
      [path]: idx,
    }),
    {},
  )

  return { paths, pathsWithoutID: paths.map(removeIDFromSlug), pathsMap }
}

export function getNewestFile() {
  const { paths } = getFilePaths()

  return getFileBySlug(paths[paths.length - 1])
}

export function getOldestFile() {
  const { paths } = getFilePaths()

  return getFileBySlug(paths[0])
}

export function getRandomFile(slug: string) {
  const { paths } = getFilePaths()
  const actualSlug = paths.find((path: string) => path.includes(slug))
  let randomSlug = actualSlug

  while (!randomSlug || randomSlug === actualSlug) {
    const idx = Math.floor(Math.random() * paths.length)
    randomSlug = paths[idx]
  }

  return getFileBySlug(randomSlug)
}

export async function getFileBySlug(slug: string) {
  const { paths, pathsMap } = getFilePaths()
  const actualSlug = paths.find((path: string) => path.includes(slug))
  if (!actualSlug) {
    throw new Error(`No file with slug "${slug}" found`)
  }

  const postFilePath = path.join(DB_PATH, `${actualSlug}.mdx`)

  const source = fs.readFileSync(postFilePath)

  const { data } = matter(source)

  return {
    data: {
      ...data,
      // images: data.images.map((i: string) => `/api/image?url=${i}`),
      date: new Date(data.date).toISOString() || '',
      slug: removeIDFromSlug(actualSlug),
    } as IComicMetadata,
    prevPage: removeIDFromSlug(paths[pathsMap[actualSlug] - 1]),
    nextPage: removeIDFromSlug(paths[pathsMap[actualSlug] + 1]),
  }
}

function removeIDFromSlug(slug: string) {
  if (!slug) {
    return ''
  }

  return slug.split('-').slice(1).join('-')
}

export function getAllCommics() {
  const { paths } = getFilePaths()

  return Promise.all(paths.map(getFileBySlug))
}
