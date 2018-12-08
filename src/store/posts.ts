import { observable } from 'mobx'
import { services } from '../common'
import { Collection } from '../model'

const { getPosts, getCollections } = services

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


  get = async () => {
    let collections = await getCollections()
    console.log(collections)
    // const posts: Post[] = await getPosts(collections[0])
    // // const posts: Post[] = getPosts()
    // console.log('posts', posts)
    // this.posts = posts
  }
}

export default new PostStore()
  }
}

export default new PostStore()
