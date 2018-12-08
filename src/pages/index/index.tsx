import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { Collection } from '../../model'

import './index.less'

type PageStateProps = {
  postsStore: {
    collections: Collection[],
    get: Function
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

  state = {
    current: 1
  }

  componentDidMount () {
    this.props.postsStore.get()
  }

  handleClick = (index => {
    this.setState({ current: index })
  })

  render () {
    const { current } = this.state
    const { postsStore: { collections } } = this.props
    const tabList = collections.map(({ name: title }) => ({ title }))
    return (
      <View className='index'>
        <AtTabs
          current={current}
          scroll={tabList.length > 5}
          tabList={tabList}
          swipeable={true}
          onClick={this.handleClick}>
          {
            collections.map((item, index) => (
              <AtTabsPane current={current} key={item.id} index={index}>
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
                              <Image className="logo" src="http://ww1.sinaimg.cn/large/6aacac8fly1fxzig19jrwj205k05k745.jpg"></Image>
                              <Text className="post-feed-title">少数派</Text>
                            </View>
                            <View className="post-status">
                              <View className="post-is-read"/>
                              <Text className="post-time">8.03PM</Text>
                            </View>
                          </View>
                          <View className="post-title-container">
                            <Text className="post-title">想了解无用但有趣的「冷知识」，你可以来这7个网站看看</Text>
                          </View>
                          <View className="post-content-container">
                            <Text className="post-content">如果你经常逛 YouTube 或是 bilibili，相信你一定见过以《X 件 XX 的事》，那么接下来</Text>
                          </View>
                        </View>
                      ))
                    }
                  </ScrollView>
                  :
                  <View className="empty-container">
                    <Text className="empty-msg">暂无内容</Text>
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
