import { ChapterModel } from './chapter.d.ts'

export interface NovelModel {
  id: string
  category: string
  author: string
  title: string
  description: string
  chapters: Array<ChapterModel>
  imageUrl: string
  imageAlt: string
  createdAt: string
  updatedAt: string
}