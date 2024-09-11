import { Novel } from '@/types/models/novel.d.ts'

export type { Novel }

export interface NovelMetaData extends Omit<Novel, 'chapters' | 'createdAt'> { }

export interface NovelBasicMetaData {
  id: Novel['id']
  title: Novel['title']
  category: Novel['category']
}

export interface CategoryNovels {
  id: string
  categoryTitle: string
  novelBasicMetaDataList: Array<NovelBasicMetaData>
}