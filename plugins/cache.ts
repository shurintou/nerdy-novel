/** set it 'false' if you don't want to use cache */
const useCache = true
export const shouldUseCache = process.env.NODE_ENV === 'development' && import.meta.server && useCache
export const cacheData: { [key: string]: any } = {}

export default defineNuxtPlugin(() => {
  const cache = $fetch.create({
    async onResponse({ request, response }) {
      if (!response.ok) {
        return Promise.reject(response)
      }
      const cacheKey = request.toString()
      if (shouldUseCache) {
        const cachedData = getCacheData(cacheKey)
        if (cachedData === null) {
          writeCacheData(cacheKey, response._data)
        } else {
          console.log('use cache data: ', cacheKey)
          response._data = cachedData
        }
      }
    }
  })
  return {
    provide: {
      cache
    }
  }
})

export function writeCacheData(key: string, data: any) {
  if (typeof data !== 'function') {
    cacheData[key as keyof object] = data
    console.log('create cache data: ', key)
  }
}

export function getCacheData(key: string): any {
  if (Object.hasOwn(cacheData, key)) {
    return cacheData[key as keyof object]
  }
  return null
}