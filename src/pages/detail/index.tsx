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

  componentWillMount () {
    const { id, index } = this.$router.params
    this.post = this.props.postsStore.collections[index].posts.find(post => post.id === id)
    Taro.showLoading({
      title: '加载中...'
    }).then(res => console.log(res))
  }

  handleError = () => {
    Taro.showToast({
      title: '加载失败',
      icon: 'none',
      duration: 2000
    })
  }

  handleLoad = () => {
    Taro.hideLoading()
  }

  render () {
    return (
      <View>
        <WebView src={this.post.originUrl} onLoad={this.handleLoad} onError={this.handleError} />
      </View>
    )
  }
}

export default Index
