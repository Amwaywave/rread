import { observable } from 'mobx'
import { services } from '../common'
import { Post } from '../model'

const { getPosts, getCollections } = services

class PostStore {
  @observable
  posts: Post[] = []

  get = async () => {
    let collections = await getCollections()
    console.log(collections)
    const posts: Post[] = await getPosts(collections[0])
    // const posts: Post[] = getPosts()
    console.log('posts', posts)
    this.posts = posts
  }
}

export default new PostStore()
