/**
 * 串行加载图片资源, 只有前一个加载成功时才会加载下一个
 * @param {*} url 
 * @param {*} isReject 
 */
const loadImage = (url, isReject) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${isReject ? 'fail' : 'success'} ===> ${url} time ===> ${Date.now()}`)
      isReject ? reject(url) : resolve(url)
    }, 1000)
  })
}

const lazyLoadArray = [
  'http://images.integrity.com.cn/FvGIkmg-q_e-TIsIzoyDbAyVFwxI',
  'http://images.integrity.com.cn/Fq-nY9MT6wctloFcHfRGPMQ_XOfc',
  'http://images.integrity.com.cn/Fj0YK5PiwGgb8nVLK3r3TLn6Ou1K'
]

lazyLoadArray.reduce((item, url) => {
  const isReject = Math.floor(Math.random() * 10) % 2
  return item.then(() => loadImage(url, isReject))
}, Promise.resolve())
.then((data) => {
  console.log('all done: ', data)
})
.catch(err => {
  console.log('some image source fail load ==> ', url)
})

