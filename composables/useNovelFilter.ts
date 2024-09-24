

/** @summary This composable responds to changes of the useRoute value. */
export function useNovelFilter() {
  const route = useRoute()
  const categoriesInQuery = route.query.category as string | string[]
  const page = useState('page', () => 1)
  const selectedCategory = useState('selectedCategory', () => [] as Array<string>)

  selectedCategory.value = Array.isArray(categoriesInQuery) ? categoriesInQuery : (categoriesInQuery ? [categoriesInQuery] : [])

  page.value = Array.isArray(route.query.page) ? parseInt(route.query.page[0] || '1', 10) : parseInt(route.query.page || '1', 10)

  function getNovelFilterSearchQuery() {
    return new URLSearchParams(route.query as Record<string, string>).toString()
  }

  function selectCategoryHandler(category: string) {
    const index = selectedCategory.value.findIndex((item: string) => item === category)
    if (index > -1) {
      selectedCategory.value.splice(index, 1)
    } else {
      selectedCategory.value.push(category)
    }
    fetchNovels()
  }

  function fetchNovels(page = 1) {
    const currentUrl = window.location.href
    const newUrl = new URL(currentUrl)
    newUrl.searchParams.set('page', page.toString())
    newUrl.searchParams.delete('category')
    selectedCategory.value.forEach(category => { if (category) newUrl.searchParams.append('category', category as string) })
    window.location.href = newUrl.toString()
  }

  return {
    page,
    selectedCategory,
    getNovelFilterSearchQuery,
    selectCategoryHandler,
    fetchNovels,
  }
}