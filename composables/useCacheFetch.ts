import fs from 'fs'
import path from 'path'
import type { UseFetchOptions } from 'nuxt/app'
import { shouldUseCache, cacheDir, dateFormatted, getCacheData } from '@/plugins/cache'

export function useCacheFetch<T>(url: string | (() => string), options?: UseFetchOptions<T>,): ReturnType<typeof useFetch<T>> {
  if (shouldUseCache) {
    const fullPath = path.join(cacheDir, dateFormatted, url + '.json')
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const cacheData = getCacheData(fullPath)
    if (cacheData !== null) {
      console.log('use cache data: ', fullPath)
      return useAsyncData(() => cacheData)
    }
  }
  return useFetch(url, { ...options, $fetch: useNuxtApp().$cache }) as any
}

