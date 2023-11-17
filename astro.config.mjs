import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  site: 'https://evangelos.ai',
  integrations: [sitemap(), prefetch()],
  markdown: {
    remarkPlugins: ['remark-math', 'remark-unwrap-images'],
    rehypePlugins: [
      [
        'rehype-katex',
        {
          // Katex plugin options
        }
      ]
    ],
    shikiConfig: {
      // wrap: true,
      theme: 'css-variables'
    }
  }
})
