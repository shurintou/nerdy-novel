import { Novel } from '@/types/models/novel.d.ts'
import { Comment } from '@/types/models/comment.d.ts'
import { Chapter } from '@/types/models/chapter.d.ts'

export type { Novel, Comment, Chapter }

export interface NovelWithCurrentChapterContent extends Novel {
  currentChapterContent: string
}

export interface NovelMetaData extends Omit<Novel, 'chapters' | 'createdAt'> { }

export interface NovelBasicMetaData extends Omit<Novel, 'chapters' | 'createdAt' | 'imageUrl' | 'imageAlt' | 'description'> { }