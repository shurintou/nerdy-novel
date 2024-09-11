import { NovelModel } from '@/types/models/novel.d.ts'

export interface NovelMetaData extends Omit<NovelModel, 'chapters' | 'createdAt'> { }