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
  summaryHtml: string,
  summary: string,
  time: string,
  // 源地址
  originUrl: string,
  unread: boolean,
  feed: Feed
  // tagList: Tag[]
}

/**
 * 订阅的内容
 */
export type Feed = {
  id: string,
  iconUrl: string,
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
