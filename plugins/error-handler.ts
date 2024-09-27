export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (error) => {
    if (process.env.NODE_ENV === 'production') {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      const local = 'ja-JP'
      const localTime = now.toLocaleString(local, options)
      const errorData = {
        message: error?.statusMessage || error?.message,
        stack: error?.stack,
        timestamp: `${localTime} ${local}`,
      }

      $fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
      }).catch(err => console.error('Failed to send error log:', err))
    }
  })
})
