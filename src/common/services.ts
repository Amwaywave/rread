import Taro from '@tarojs/taro'
import { Post, Collection, Feed } from '../model'
import { getTextByHtml, getTime } from './utils'

// api server
const API_DOMAIN = "http://144.34.251.62:8080"
// collections api
const API_COLLECTIONS = "/v3/collections"
// postlist api
const API_POST_LIST = "/v3/streams/{streamId}/contents?count=10"

// default token
const TOKEN = "AyrCQtCm-PzFXwmeU8FZVsEQKEy8b7ePLj6F5PUzmsRgAZi2mvX4dYbknOIqO22C19LKNvzdOUMDhKXerbscNPRzmPMqQoLCCLKFM7W-5pJ6ic7nftNhjSJeprrUiVncMa5CcVc8HNa54o3GqFw5IqDWbQ2fqiepPAbj_Kn89-kDd0UKEM1NlxdMSfAcowpENHpABISDayRB8C9JaO19w1MiIfHS4aoVAGPJxHqrrZ1qVS2XPiYRFRCAkSJa:feedlydev"

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

export const getPosts = async (collection: Collection) => {
  try {
    const { data: { items } } = await request(API_POST_LIST.replace("{streamId}", encodeURIComponent(collection.id)))
    if (items && items.length) {
      const posts: Post[] = []
      items.forEach(item => {
        const summaryHtml = item.summary ? item.summary.content : ''
        const summary = getTextByHtml(summaryHtml)
        const time = getTime(item.published)
        const feed = collection.feeds.find(feed => feed.id === item.origin.streamId)!
        posts.push({
          id: item.id,
          title: item.title,
          originUrl: item.originId,
          summaryHtml,
          summary,
          time,
          feed,
          unread: item.unread,
        })
      })
      return Promise.resolve(posts)
    }
  } catch (error) {
    return Promise.resolve([])
  }
}
