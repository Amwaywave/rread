import { observable } from 'mobx'
import { services } from '../common'
import { Collection } from '../model'

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

  @observable
  loading = false


  getCollections = async () => {
    this.collections = await services.getCollections()
    this.getPosts(0)
  }

  getPosts = async (index) => {
    this.loading = true
    const collection = this.collections[index]
    try {
      this.collections[index].posts = await services.getPosts(collection)
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}

export default new PostStore()
