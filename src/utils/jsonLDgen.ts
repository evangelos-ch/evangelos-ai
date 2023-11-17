import type { CollectionEntry } from 'astro:content'

export const generateJsonLD = (
  post?: CollectionEntry<'blog'>,
  url?: string
) => {
  if (post && url) {
    return `<script type="application/ld+json">
                {
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "${url}"
                    },
                    "headline": "${post.data.title}",
                    "description": "${post.data.description}",
                    "author": {
                        "@type": "Person",
                        "name": "${post.data.author}",
                    },
                    "datePublished": "${post.data.pubDate.toISOString()}"
                }
            </script>`
    // TODO "image": "${post.image.src}", to above JSON at top level below description
  } else {
    return `<script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "evangelos.ai",
        "url": "${import.meta.env.SITE}"
      }
    </script>`
  }
}
