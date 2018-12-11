import { observable, autorun } from 'mobx'
import Taro from '@tarojs/taro'
import { services } from '../common'
import { Collection } from '../model'

const STOREKEY = 'collections'

class PostStore {
  constructor() {
    // auto setStorage
    autorun(() => {
      if (this.collections) {
        Taro.setStorage({ key: STOREKEY, data: JSON.stringify(this.collections) })
        .then(res => console.log('setStorage', res))
      }
    })
    // getStorage
    try {
      const data = Taro.getStorageSync(STOREKEY)
      if (data) {
        const collections = JSON.parse(data)
        if (collections && collections.length) {
          this.collections = collections
        }
      }
    } catch (error) {
      console.error('getStorageSync error', error)
      Taro.setStorage({ key: STOREKEY, data: '' })
    }

  }

  @observable
  collections: Collection[] = []

  @observable
  loading = false

  getCollections = async () => {
    const collections = await services.getCollections()
    if (collections && collections.length) {
      // diff
      this.collections = collections.map(item => {
        const collection = this.collections.find(({ id }) => id === item.id)
        if (collection) {
          return collection
        }
        return item
      })
    }
    this.getPosts(0)
  }

  getPosts = async (index) => {
    const collection = this.collections[index]
    if (collection.posts.length) {
      if (Date.now() - collection.posts[0].resTime < 1000 * 60 * 5) {
        return
      }
    }
    this.loading = true

    try {
      collection.posts = await services.getPosts(collection)
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}

export default new PostStore()
