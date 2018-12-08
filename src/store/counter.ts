import { observable } from 'mobx'

class CounterStore {
  @observable
  counter = 0

  increment = () => {
    this.counter++
  }

  decrement = () => {
    this.counter--
  }

  incrementAsync = () => {
    setTimeout(() => {
      this.counter++
    }, 1000);
  }
}

const countStore = new CounterStore()

export default countStore
