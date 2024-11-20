import type { WebErrorMap } from '@/types/common/error'

const webError: WebErrorMap = {
  400: { statusCode: 400, statusMessage: '客户端存在异常，请稍后重试。' },
  404: { statusCode: 404, statusMessage: '您试图访问的页面不存在。' },
  500: { statusCode: 500, statusMessage: '服务器存在异常，请稍后重试。', },
}

export default defineAppConfig({
  webError,
})