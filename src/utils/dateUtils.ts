import type { CollectionEntry } from 'astro:content'

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
    const daysAgo = Math.floor(diff / day)
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  }

  if (diff < month) {
    const weeksAgo = Math.floor(diff / (month / 4))
    return `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`
  }

  return postDate.toLocaleDateString('en-GB')
}

export interface BlogEntryMap {
  [year: number]: {
    [month: number]: CollectionEntry<'blog'>[]
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

export const getPostSlug = (post: CollectionEntry<'blog'>) => {
  const date = post.data.pubDate
  const slug = (post.slug.match(/\d{4}-\d{2}-\d{2}-(.+)/) || [])[1] || post.slug
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${year}/${month}/${slug}`
}

export const splitPostsByDate = (posts: CollectionEntry<'blog'>[]) => {
  let ret: BlogEntryMap = {}

  posts.forEach((post) => {
    const date = post.data.pubDate
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
