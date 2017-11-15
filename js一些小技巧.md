#### 平时遇到的一些知识点收录

```
  ### 关于任务队列的执行顺序 https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
  macrotasks: script(整体代码),setTimeout, setInterval, setImmediate, I/O, UI rendering
  microtasks: process.nextTick, Promises, Object.observe, MutationObserver


  先从macrotasks取出第一个任务，执行完毕后再取microtasks里面的所有任务，按顺序执行，等待任务执行完后取macrotasks里面的第二个任务，以此类推，直到两个任务队列执行完毕
```


```javascript
  ### 关于页面可见性的收录 http://devdocs.io/dom/page_visibility_api
  // polyfill
  var hidden = null,
      visibilityChange = null
  
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }

  var videoElement = document.getElementById("videoElement");

  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange() {
    if (document[hidden]) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
  }

  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change   
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
      
    // When the video pauses, set the title.
    // This shows the paused
    videoElement.addEventListener("pause", function(){
      document.title = 'Paused';
    }, false);
      
    // When the video plays, set the title.
    videoElement.addEventListener("play", function(){
      document.title = 'Playing'; 
    }, false);

  }

  // 主要解决场景
  - 减少资源重新加载
  - 提高用户体验
  - 做一些预渲染或者其他操作
```
