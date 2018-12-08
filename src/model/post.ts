export type Tag = {
  id: number,
  name: string
}

export type Post = {
  id: number,
  title: string,
  content: string,
  date: Date,
  tagList: Tag[]
}
