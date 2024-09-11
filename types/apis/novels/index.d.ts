import { NovelModel } from '@/types/models/novel.d.ts'

export interface NovelWithCurrentChapterContent extends NovelModel {
  currentChapterContent: string
}

export interface NovelMetaData extends Omit<NovelModel, 'chapters' | 'createdAt'> { }

export interface NovelBasicMetaData extends Omit<NovelModel, 'chapters' | 'createdAt' | 'imageUrl' | 'imageAlt' | 'description'> { }