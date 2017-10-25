/*
 * @Description: rx 学习
 * @Author: Lyp 
 * @Date: 2017-09-11 10:25:13
 * @Last Modified by: Lyp
 * @Last Modified time: 2017-09-19 14:49:40
 */

 
const Rx =  require('rxjs/Rx')
const { Observable } = Rx

/**
 * 创建观察者，定时推流
 */

const source = Observable.interval(1000)
  .take(5)
  .map((x) => {
    console.log('source: ', x)
    return x * 2
  })

/**
 * Observable.defaultIfEmpty
 * 当流的数据不确定是否为空时，使用defaultIfEmpty设置默认值
 */

const sourceDefault = Observable.of().defaultIfEmpty(100)
sourceDefault.subscribe(x => console.log('sourceDefault', x))

source.subscribe(x => console.log('subscribe: ', x))

const source1 = Observable.of(4)

source1.subscribe(x => console.log('source1 subscribe: ', x))

/**
 * combineLatest 的作用就是观察两个管道的数据流是否变化，合并数据流
 */
const totalSource = Observable.combineLatest(source, source1, (interval, number) => ({
  interval,
  number
}))

totalSource.subscribe(x => console.log('combineLastest: ', x))


/**
 * 类似实现??
 */

class Observable1 {
  constructor(values) {
    this.values = values
  }

  of(...array) {
    // 不管传入什么值，都转为数组形式存
    return new Observable1(array)
  }

  defaultIfEmpty(...array) {
    // 不存在的时候使用默认值
    if (!this.values.length) {
      this.values = array
    }
    return this;
  }
}
