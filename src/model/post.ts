/**
 * 文章的标签
 */
export type Tag = {
  id: number,
  name: string
}

/**
 * 文章内容
 */
export type Post = {
  id: string,
  title: string,
  summary: string,
  date: Date,
  // 源地址
  originUrl: string,
  feed: Feed
  // tagList: Tag[]
}

/**
 * 订阅的内容
 */
export type Feed = {
  id: string,
  icon: string,
  subscribers: number,
  title: string,
  topics: string[],
  visualUrl: string,
  website: string,
  feedId: string
}

/**
 * 集合
 */
export type Collection = {
  id: string,
  name: string,
  feeds: Feed[],
  posts: Post[]
}
