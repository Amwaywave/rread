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
  id: number,
  title: string,
  content: string,
  date: Date,
  tagList: Tag[]
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
  wbsite: string,
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
