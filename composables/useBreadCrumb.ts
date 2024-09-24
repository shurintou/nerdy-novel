import type { BreadCrumb } from '@/types/common/breadCrumb'


export function useBreadCrumb() {
  const novelTitle = useState('novelTitle', () => '小说目录')
  const updateNovelTitle = (title: string) => {
    novelTitle.value = title
  }
  const breadCrumbs = computed(() => {
    const route = useRoute()
    const novelId = route.params.id
    const chapterOrder = route.params.order
    const result: Array<BreadCrumb> = [{ name: '主页', 'path': '/' }]
    if (novelId?.length > 0) {
      result.push({ name: novelTitle.value, path: `/novels/${novelId}` })
      if (chapterOrder?.length > 0) {
        result.push({ name: `第${chapterOrder}章`, path: `/novels/${novelId}/chapters/${chapterOrder}` })
      }
    }
    return result
  })
  return {
    updateNovelTitle,
    breadCrumbs,
  }
}