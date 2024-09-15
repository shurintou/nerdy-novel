import fs from 'fs'
import path from 'path'

/** set it 'false' if you don't want to use cache */
const useCache = true
export const cacheDir = './.cache'
export const dateFormatted = getDateFormatted()
export const shouldUseCache = process.env.NODE_ENV === 'development' && import.meta.server && useCache

export default defineNuxtPlugin(() => {
  const cache = $fetch.create({
    async onResponse({ request, response }) {
      if (shouldUseCache) {
        const fullPath = path.join(cacheDir, dateFormatted, request.toString() + '.json')
        const dir = path.dirname(fullPath)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        const cacheData = getCacheData(fullPath)
        if (cacheData === null) {
          writeCacheData(fullPath, response._data)
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

export function getDateFormatted() {
  const date = new Date()
  return date.getFullYear() + '' + (date.getMonth() + 1) + '' + (date.getDate())
}

export function checkCacheFile(filePath: string) {
  return fs.existsSync(filePath)
}

export function readCacheFile(filePath: string) {
  const rawData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(rawData)
  return data
}

export function writeCacheData(filePath: string, data: any) {
  if (typeof data !== 'function') {
    fs.writeFileSync(filePath, JSON.stringify(data))
    console.log('create cache data: ', filePath)
  }
}

export function getCacheData(filePath: string) {
  if (checkCacheFile(filePath)) {
    return readCacheFile(filePath)
  }
  return null
}