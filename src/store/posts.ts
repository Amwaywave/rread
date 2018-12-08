import { observable } from 'mobx'
import { services } from '../common'
import { Post } from '../model'

const { getPosts } = services

class PostStore {
  @observable
  posts: Post[] = []

  get = () => {
    const posts: Post[] = getPosts()
    console.log('posts', posts)
    this.posts = posts
  }
}

export default new PostStore()
