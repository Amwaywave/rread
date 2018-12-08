import Taro from '@tarojs/taro'
import { Post, Collection, Feed } from '../model'
import {getTextByHtml } from './utils'

// api server
const API_DOMAIN = "https://cloud.feedly.com"
// collections api
const API_COLLECTIONS = "/v3/collections"
// postlist api
const API_POST_LIST = "/v3/streams/{streamId}/contents?count=1"

//
const TOKEN = "AyrCQtCm-PzFXwmeU8FZVsEQKEy8b7ePLj6F5PUzmsRgAZi2mvX4dYbknOIqO22C19LKKfzeOUcDiaTVqb4cNPJzl_EnT5zMQ_mdK_TptJcg2cmyY8pq2iNHv-jV3kOTOP5CakM_Tdu87Y2Xq11rcbPYY1_Nsiu0KF7jsqn34-8MeExeFclFlh9BEvNNuxZEbnoMBM7TdDJb9y5Dc-owgVN5IbzS6bgWB3zD2Wy-rclqFy3eaDQLEB-WlHJDaZc:feedlydev"

const mockData = {
  posts: [
    {
      id: 1,
      title: '第一个标题',
      content: '内容',
      date: new Date(),
      tagList: [
        {
          id: 1,
          name: '新闻资讯'
        }
      ]
    }
  ]
}


function getHeaders() {
  return {
    "Authorization": TOKEN
  }
}

/**
 *  发起请求
 * @param url 请求地址
 * @param callback	请求后的回调
 */
function request(url: string): Promise<any> {
  console.log("send request: " + API_DOMAIN + url)
  return Taro.request({
    url: API_DOMAIN + url,
    header: getHeaders()
  })
}

export const getCollections = async (): Promise<Collection[]> => {
  let collections: Collection[] = []
  const res = await request(API_COLLECTIONS)
  const data = res.data
  if (data && data.length > 0) {
    data.forEach(e => {
      let feeds: Feed[] = []
      if (e.feeds && e.feeds.length > 0) {
        feeds = e.feeds.map(({ id, feedId, iconUrl, subscribers, title, topics, visualUrl, website }) =>
          ({ id, feedId, iconUrl, subscribers, title, topics, visualUrl, website }))
      }
      collections.push({
        id: e.id,
        name: e.label,
        feeds: feeds,
        posts: []
      })
    })
  }
  return Promise.resolve(collections)
}

export const getPosts = async (collection?: Collection) => {
  let posts: Post[] = []
  // 获取该collection下的所有feeds
  if (collection) {
    // 直接使用已经获取的feeds
    const reqList = collection.feeds.map(({ feedId }) => request(API_POST_LIST.replace("{streamId}", encodeURIComponent(feedId))))
    const resList = await Promise.all(reqList)
    resList.forEach((res, index)=> {
      const feed = collection.feeds[index]
      let data = res.data
      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
        let content = getTextByHtml(item.summary ? item.summary.content : "")
        console.log(content)
          posts.push({
            id: item.id,
            title: item.title,
            originUrl: item.originId,
            summary: content,
            date: new Date(item.published),
            feed: feed
          })
        })
      }
    })
    posts = posts
  }
  return Promise.resolve(posts.slice(0, 2))
}
