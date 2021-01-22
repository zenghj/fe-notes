* [What is a blob URL and why it is used?](https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used)

* [HTML5 Video Streaming with Blob Urls](http://techslides.com/html5-video-streaming-with-blob-urls)
  * 不用一次性载入整个视频文件，而是通过流的形势逐步加载
  * 实例
    * [HTML5 Drag and Drop Local Video Files for Screenshots](http://techslides.com/demos/video/dragdrop-video-screenshot.html)

## note

* 形如`blob:http://techslides.com/e5a4949e-53de-4f3b-b32c-0d1b9a386992`这样的链接并不是个服务器资源URI，而是在浏览器端生成的，每次执行生成的hash是不同的
  * 可通过URL.createObjectURL生成



* [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
  * The new object URL represents the specified File, Blob, or MediaSource object。