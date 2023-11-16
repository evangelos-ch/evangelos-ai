import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Anonymous'),
    pubDate: z.date(),
    type: z.union([
      z.literal('science'),
      z.literal('industry'),
      z.literal('engineering')
    ]),
    tags: z.array(z.string())
  })
})

export const collections = {
  blog: blogCollection
}
