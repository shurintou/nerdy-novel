import { Chapter } from './chapter.d.ts'

export interface Novel {
  id: string
  category: string
  author: string
  title: string
  description: string
  chapters: Array<Chapter>
  imageUrl: string
  imageAlt: string
  createdAt: string
  updatedAt: string
}