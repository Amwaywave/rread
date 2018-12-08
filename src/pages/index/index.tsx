import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { Post } from '../../model'

import './index.less'

type PageStateProps = {
  postsStore: {
    posts: Post[],
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

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
    this.props.postsStore.get()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  handleClick = (index => {
    this.setState({ current: index })
  })

  render () {
    const { postsStore} = this.props
    return (
      <View className='index'>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' },
            { title: '标签页4' },
            { title: '标签页5' },
            { title: '标签页6' }
          ]}
          onClick={this.handleClick}>
          <AtTabsPane current={this.state.current} index={0}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Index
