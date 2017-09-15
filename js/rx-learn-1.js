/*
 * @Description: rx
 * @Author: Lyp 
 * @Date: 2017-09-13 19:25:02 
 * @Last Modified by: Lyp
 * @Last Modified time: 2017-09-14 17:27:12
 */

const Rx =  require('rxjs/Rx')
const { Observable } = Rx

/** 重复订阅同一个可观察对象，互不干扰 */

/**
 * Observable.create
 * 创建一个可观察的对象 通常用of from 等
 */
const source = Observable.create((observer) => {
  let count = 1;
  setInterval(() => {
    observer.next(count++)
  }, 1000)
})

source.subscribe(x => console.log(x))
setTimeout(() => {
  source.subscribe(x => console.log('source1: ', x))
}, 4000)


