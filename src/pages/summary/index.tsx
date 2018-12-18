import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { observable } from 'mobx'
import { Collection, Post } from '../../model'

import './index.less'


type PageStateProps = {
  postsStore: {
    collections: Collection[],
    loading: boolean,
    getCollections: Function,
    getPosts: Function
  }
}

interface ParseComponent {
  props: PageStateProps;
}

@inject('postsStore')
@observer
class ParseComponent extends Component {
  @observable
  post: Post | undefined

  config = {
    // 定义需要引入的第三方组件
    usingComponents: {
      htmltowxml: '../../components/html2wxml-component/html2wxml'
    },
    navigationBarTitleText: '文章详情'
  }

  componentDidMount () {
    const { id, index } = this.$router.params
    this.post = this.props.postsStore.collections[index].posts.find(post => post.id === id)
  }

  onClick = () => {
    const { id, index } = this.$router.params
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&index=${index}`
    })
  }

  onTagClick = (e) => {
    Taro.navigateTo({
      url: `/pages/detail/index?url=${e.detail.src}`
    })
  }

  render () {
    const post = this.post!
    return (
      <View className="summary">
        <View className="post-title-container" onClick={this.onClick}>
          <View className="post-title">{post.title}</View>
          <View className="post-feed-title">{post.feed.title}</View>
        </View>
        <View className="wxParse">
          <htmltowxml text={post.summaryHtml} onwxmltagatap={this.onTagClick} padding={30}></htmltowxml>
        </View>
      </View>
    )
  }
}

export default ParseComponent
