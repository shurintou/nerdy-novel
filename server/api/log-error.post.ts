import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { message, stack, timestamp } = body
  const logFileName = timestamp.split(' ')[0].replace(/\//g, '-') + '.log'
  const logFilePath = join(process.cwd(), 'logs', logFileName)
  const logContent = `
    Timestamp: ${timestamp}
    Error Message: ${message}
    Stack Trace: ${stack}
  `

  try {
    await fs.mkdir(join(process.cwd(), 'logs'), { recursive: true })
    await fs.appendFile(logFilePath, logContent + '\n')
  } catch (err) {
    console.error('Failed to write log:', err)
  }
})
