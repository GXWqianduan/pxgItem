$(function () {
   // click事件移动端有延迟,mui框架中屏蔽了单击事件,默认行为
   // 解决方法是给a绑定tap事件,
   mui('body').on('tap', 'a', function (e) {
      e.preventDefault();
      window.top.location.href = this.href;
   })
   // zepto导航拦截器    // beforeSend：每次发送ajax请求都必须经过的处理函数
   $.ajaxSettings.beforeSend = function (xhr, obj) {
      const baseURL = 'http://140.143.222.79:8899/api/public/v1/';
      // 失效
      // const baseURL = 'http://157.122.54.189:9094/api/public/v1';
      //  console.log(obj);
      // 添加遮罩
      //  $('body').addClass('loadding')
      obj.url = baseURL + obj.url;   //请求的完整路径
      if (obj.url.indexOf('/my')!=-1 ){
         xhr.setRequestHeader('Authorization', sessionStorage.getItem('pyg_token'))
         // debugger
      }
   }
   $.ajaxSettings.complete = function () {
      //  console.log(1111);
      $('body').removeClass('loadding');

   }
   // 动态给$原型添加方法
   $.extend($, {
      getParameter:function (url) {

         var obj = {}
         // location.search:url中?及?后面的内容
         url = url.substring(1) //cid=5&name=jack
         // 先按&拆分
         var arr = url.split('&') //['cid=5','name=jack']
         // 遍历进行第二次拆分
         for (var i = 0; i < arr.length; i++) {
            var temp = arr[i].split('=') //['cid',5]
            obj[temp[0]] = temp[1] // obj['cid'] = 5
         }
         return obj
      }
   });
})