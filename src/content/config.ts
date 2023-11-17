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
    imageUrl: z
      .string()
      .regex(/\/images\/(posts\/)?[A-Za-z0-9-_]+(\.jpeg|\.jpg|\.png)/)
      .optional(),
    tags: z.array(z.string())
  })
})

export const collections = {
  blog: blogCollection
}
