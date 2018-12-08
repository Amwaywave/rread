export type Tag = {
  id: number,
  name: string
}

export type Post = {
  title: string,
  content: string,
  date: Date,
  tagList: Tag[]
}
