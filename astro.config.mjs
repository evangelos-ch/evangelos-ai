import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  site: 'https://evangelos.ai',
  integrations: [sitemap(), prefetch()],
  markdown: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: [
      [
        'rehype-katex',
        {
          // Katex plugin options
        }
      ]
    ]
  }
})
