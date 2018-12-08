import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { observable } from 'mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { Collection } from '../../model'

import './index.less'

type PageStateProps = {
  postsStore: {
    collections: Collection[],
    loading: boolean,
    getCollections: Function,
    getPosts: Function
  }
}

interface Index {
  props: PageStateProps;
}

@inject('postsStore')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  @observable current = 0


  componentDidMount () {
    this.props.postsStore.getCollections()
  }

  handleClick = (index => {
    this.props.postsStore.getPosts(index)
    this.current = index
  })

  render () {
    const { postsStore: { collections, loading } } = this.props
    const tabList = collections.map(({ name: title }) => ({ title }))
    return (
      <View className='index'>
        <AtTabs
          current={this.current}
          scroll={tabList.length > 5}
          tabList={tabList}
          swipeable={true}
          onClick={this.handleClick}>
          {
            collections.map((item, index) => (
              <AtTabsPane current={this.current} key={item.id} index={index}>
                {
                  item.posts && item.posts.length ?
                  <ScrollView
                    className="post-container"
                    scrollY={true}
                    enable-back-to-top={true}>
                    {
                      item.posts.map(post => (
                        <View className="post-item" key={post.id}>
                          <View className="post-info">
                            <View className="post-feed">
                              <Image className="logo" src={post.feed.icon}></Image>
                              <Text className="post-feed-title">{post.feed.title}</Text>
                            </View>
                            <View className="post-status">
                              <View className="post-is-read"/>
                              <Text className="post-time">8.03PM</Text>
                            </View>
                          </View>
                          <View className="post-title-container">
                            <Text className="post-title">{post.title}</Text>
                          </View>
                          <View className="post-content-container">
                            <Text className="post-content">{post.summary}</Text>
                          </View>
                        </View>
                      ))
                    }
                  </ScrollView>
                  :
                  <View className="empty-container">
                    {
                      loading
                      ?
                      <Text className="empty-msg">加载中...</Text>
                      :
                      <Text className="empty-msg">暂无内容</Text>
                    }

                  </View>
                }
              </AtTabsPane>
            ))
          }
        </AtTabs>
      </View>
    )
  }
}

export default Index
