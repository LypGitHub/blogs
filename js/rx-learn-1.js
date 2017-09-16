/*
 * @Description: rx
 * @Author: Lyp 
 * @Date: 2017-09-13 19:25:02 
 * @Last Modified by: Lyp
 * @Last Modified time: 2017-09-16 12:30:49
 */

const Rx =  require('rxjs/Rx')
const { Observable } = Rx

/** 重复订阅同一个可观察对象，互不干扰 */

/**
 * Observable.create
 * 创建一个可观察的对象 通常用of from 等
 */
// const source = Observable.create((observer) => {
//   let count = 1;
//   setInterval(() => {
//     observer.next(count++)
//   }, 1000)
// })

// source.subscribe(x => console.log(x))
// setTimeout(() => {
//   source.subscribe(x => console.log('source1: ', x))
// }, 4000)

/**
 * Observable.from
 */
const source_from = Observable.from([10, 20, 30]).delayWhen(x => Observable.timer(x, 1000))

source_from.subscribe(x => console.log('subscribe: ', x))


const source_interval = Observable.interval(1000)

const observableCreateWrap = (observer) => {
  return Observable.from(observer)
    .map(x => x + 1)
}

const source_wrap = observableCreateWrap(source_interval);

source_wrap.subscribe(x => console.log(`xx: ${x}`))