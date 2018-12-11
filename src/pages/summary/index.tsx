import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Collection } from '../../model'
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
  componentDidMount () {
    const { id, index } = this.$router.params
    this.post = this.props.postsStore.collections[index].posts.find(post => post.id === id)
    const article = this.post.summaryHtml
    WxParse.wxParse('article', 'html', article, this.$scope, 5)
  }

  render () {
    return (
      <View className="summary">
        <import src='../../components/wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
      </View>
    )
  }
}

export default ParseComponent
