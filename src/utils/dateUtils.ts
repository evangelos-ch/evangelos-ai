import type { MarkdownInstance } from 'astro'

export const relativeDate = (date: string) => {
  const postDate = new Date(date)
  const currentDate = new Date()
  const diff = (currentDate.getTime() - postDate.getTime()) / 1000 // in seconds
  const minute = 60
  const hour = 60 * 60
  const day = 60 * 60 * 24
  const week = 60 * 60 * 24 * 7
  const month = 60 * 60 * 24 * 30

  if (diff < minute) {
    const secondsAgo = Math.floor(diff)
    return `${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`
  }

  if (diff < hour) {
    const minutesAgo = Math.floor(diff / minute)
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
  }

  if (diff < day) {
    const hoursAgo = Math.floor(diff / hour)
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
  }

  if (diff < week) {
    return `${Math.floor(diff / (week / 7))} days ago`
  }

  if (diff < month) {
    const weeksAgo = Math.floor(diff / (month / 4))
    return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`
  }

  return postDate.toLocaleDateString('en-GB')
}

export type Post = MarkdownInstance<Record<string, any>>
export interface PostMap {
  [year: number]: {
    [month: number]: Post[]
  }
}
export const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const splitPostsByDate = (posts: Post[]) => {
  let ret: PostMap = {}

  posts.forEach((post) => {
    const date = new Date(post.frontmatter.pubDate)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (!ret[year]) {
      ret[year] = {}
    }

    if (!ret[year][month]) {
      ret[year][month] = []
    }

    ret[year][month].push(post)
  })

  return ret
}
