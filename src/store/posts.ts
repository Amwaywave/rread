import { observable } from 'mobx'
import { services } from '../common'
import { Post } from '../model'

const { getPosts } = services

class PostStore {
  @observable
  posts: Post[] = []

  get = async () => {
    const posts: Post[] = await getPosts()
    this.posts = [...posts]
  }
}

export default new PostStore()
