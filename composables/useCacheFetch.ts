import type { UseFetchOptions } from 'nuxt/app'

export function useCacheFetch<T>(url: string | (() => string), options?: UseFetchOptions<T>,): ReturnType<typeof useFetch<T>> {
  return useFetch(url, { ...options, $fetch: useNuxtApp().$cache }) as any
}

