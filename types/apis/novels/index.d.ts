import { Novel } from '@/types/models/novel.d.ts'
import { Comment } from '@/types/models/comment.d.ts'
import { Chapter } from '@/types/models/chapter.d.ts'

export type { Novel, Comment, Chapter }

export interface NovelMetaData extends Omit<Novel, 'chapters' | 'createdAt'> { }

export interface NovelBasicMetaData extends Omit<Novel, 'chapters' | 'createdAt' | 'imageUrl' | 'imageAlt' | 'description'> { }

export interface CategoryNovelsParams {
  /** @type {string | undefined} The value could be undefined during the initial page load. When defined, the format is as follows: '玄幻, 穿越, 仙侠...'*/
  category?: string
  page?: number
}

export interface CategoryNovelsData {
  category: Array<string>
  novels: Array<NovelBasicMetaData>
  total: number
  page: number
  totalPages: number
}