import Taro, { Component, Config } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'
import { AtToast } from "taro-ui"
import { observer, inject } from '@tarojs/mobx'
import { observable } from 'mobx'
import { Collection } from '../../model'

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

  config: Config = {
    navigationBarTitleText: '文章详情'
  }

  @observable post
  @observable msg = '加载中...'
  @observable status: 'error' | 'loading' | 'success' = 'loading'

  componentWillMount () {
    const { id, index } = this.$router.params
    this.post = this.props.postsStore.collections[index].posts.find(post => post.id === id)
  }

  handleError = () => {
    this.status = 'error'
    this.msg = '加载失败'
  }

  handleLoad = () => {
    this.status = 'success'
  }

  render () {
    return (
      <View>
        <AtToast
          isOpened={this.status !== 'success'}
          text={this.msg}
          status={this.status}
        />
        <WebView src={this.post.originUrl} onLoad={this.handleLoad} onError={this.handleError} />
      </View>
    )
  }
}

export default Index
