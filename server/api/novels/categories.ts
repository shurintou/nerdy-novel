
export const categoriesMaster = [
  "玄幻", "奇幻", "修真", "武侠", "科幻",
  "悬疑", "推理", "灵异", "恐怖", "都市",
  "言情", "历史", "军事", "游戏", "竞技",
  "同人", "穿越", "重生", "短篇", "冒险"
]

export default defineEventHandler(async (): Promise<Array<string>> => {
  return categoriesMaster
})

