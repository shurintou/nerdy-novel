
export function useNerdySeoMeta(input: Parameters<typeof useSeoMeta>[0], options?: Parameters<typeof useSeoMeta>[1]) {
  /** @todo ↓ */
  const basicUrl = 'https://my-domain.com'
  const releaseDate = new Date('2024-10-01').toISOString()
  /******** ↑ */

  const title = '呆书网 - 畅享虚拟小说世界'
  const description = '呆书网提供各种有趣独特的小说，让您体验不同寻常的文学创作，尽情享受虚拟文学世界。'
  const keywords = '呆书网, 小说, 虚拟, 有趣, 独特, 阅读, 轻松'
  const charset = 'utf-8'
  const colorScheme = 'light dark'
  const applicationName = '呆书网'
  const robots = 'index, follow'
  const type = 'website'
  const locale = 'zh_CN'
  const siteName = '呆书网'
  const ogImage = '/default-og-image.jpg'
  const twitterCard = 'summary_large_image'

  useSeoMeta({
    title: input.title || title,
    description: input.description || description,
    keywords: input.keywords || keywords,
    charset,
    colorScheme,
    applicationName,
    robots,
    ogTitle: input.ogTitle || input.title?.toString() || title,
    ogUrl: input.ogUrl || basicUrl,
    ogType: input.ogType || type,
    ogLocale: input.ogLocale || locale,
    ogSiteName: input.ogSiteName || siteName,
    ogDescription: input.ogDescription || input.description || description,
    ogImage: input.ogImage || ogImage,
    twitterTitle: input.twitterTitle || input.title?.toString() || title,
    twitterCard: twitterCard,
    twitterDescription: input.twitterDescription || input.description || description,
    twitterImage: input.twitterImage || ogImage,
    ...(input.bookAuthor && { bookAuthor: input.bookAuthor }),
    ...(input.bookTag && { bookTag: input.bookTag }),
    ...(input.bookReleaseDate && { bookReleaseDate: input.bookReleaseDate }),
    ...input,
    ...options,
  })
}
