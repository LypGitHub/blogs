/*
 * @Description: 大概学习下模块机制
 * @Author: Lyp 
 * @Date: 2017-09-15 11:06:45 
 * @Last Modified by: Lyp
 * @Last Modified time: 2017-10-24 14:04:12
 */


class LoadScript {
  constructor () {
    this.path = ''
  }

  load (module) {
    
  }
}
class Module {
  constructor() {
    this.modules = {};
  }

  /**
   * 获取模块
   * 
   * @param {any} name 
   * @returns
   * @memberof Module
   */
  get(name) {
    return typeof this.modules[name] === 'object'
      ? this.modules[name]
      : this.error('模块未找到')
  }

  /**
   * 注册模块
   * @tip 模块没有验证是否存在，直接覆盖
   * 
   * @param {any} name 
   * @param {any} fn 
   * @returns 
   * @memberof Module
   */
  registModule(name, fn) {
    const callFn = typeof fn === 'function' ? fn : function() {
      console.log(`module name: ${name}`)
    }
  
    return this.modules[name] = fn;
  }

  /**
   * 异常捕获，返回Promise
   * 
   * @param {any} err 
   * @returns 
   * @memberof Module
   */
  error(err) {
    const error = new Error(err || '异常信息')
    return ((error) => {
      return Promise.reject(error)
    })(error);
  }

  /**
   * 创建函数体，将加载的模块传入回调
   * 
   * @param {any} modules 
   * @param {any} cb 
   * @returns 
   * @memberof Module
   */
  createFn(modules, cb) {
    const args = modules.map(item => {
      const fn = this.get(item) ? this.get(item) : {};
      return fn;
    })
    return cb.apply(this, args);
  }

  /**
   * 声明并创建模块
   * 
   * @param {any} name 
   * @param {any} modules 
   * @param {any} cb 
   * @memberof Module
   */
  define(name, modules, cb) {
    this.registModule(name, this.createFn(modules, cb))
  }
}

const myModule = new Module();
myModule.define('bar', [], function() {
  function hello (str = '') {
    return 'hello' + str
  }
  return {
    hello: hello
  }
})

myModule.define('foo', ['bar'], function(bar) {
  var test = 'tRst'
  function testDemo() {
    console.log(bar.hello(test).toUpperCase())
  }
  return {
    testDemo: testDemo
  }
})

var bar = myModule.get('bar')
var foo = myModule.get('foo')

foo.testDemo()