import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { observable } from 'mobx'
import { Collection, Post } from '../../model'
import WxParse from '../../components/wxParse/wxParse'

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

  componentDidMount () {
    const { id, index } = this.$router.params
    this.post = this.props.postsStore.collections[index].posts.find(post => post.id === id)
    const article = this.post!.summaryHtml
    WxParse.wxParse('article', 'html', article, this.$scope, 5)
  }

  onClick = () => {
    const { id, index } = this.$router.params
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&index=${index}`
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
          <import src='../../components/wxParse/wxParse.wxml' />
          <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
        </View>
      </View>
    )
  }
}

export default ParseComponent
