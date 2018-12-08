import { observable } from 'mobx'
import { services } from '../common'
import { Collection } from '../model'

const { getPosts } = services

const CATEGORIES = ['科技', '游戏', '博客', '时尚', '财经']
const POSTS = [
  {
    id: 1,
    title: '第一个标题',
    content: '内容',
    date: new Date(),
    tagList: []
  },
]

for(let i = 20; i > 0; i--) {
  POSTS.push({
    id: i,
    title: '第一个标题',
    content: '内容',
    date: new Date(),
    tagList: []
  })
}

class PostStore {
  @observable
  collections: Collection[] = []

  get = () => {
    this.collections = CATEGORIES.map((category, index) => ({
      id: index.toString(),
      name: category,
      feeds: [],
      posts: POSTS,
    }))
  }
}

export default new PostStore()
