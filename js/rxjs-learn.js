/*
 * @Description: rx 学习
 * @Author: Lyp 
 * @Date: 2017-09-11 10:25:13
 * @Last Modified by: Lyp
 * @Last Modified time: 2017-09-13 19:24:54
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
