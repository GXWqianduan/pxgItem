$(function () {
   // click事件移动端有延迟,mui框架中屏蔽了单击事件,默认行为
   // 解决方法是给a绑定tap事件,
   mui('body').on('tap','a',function(e){
      e.preventDefault();
      window.top.location.href=this.href;
   })
  // zepto导航拦截器
 $.ajaxSettings.beforeSend = function (xhr, obj) {
    const baseURL = 'http://157.122.54.189:9094/api/public/v1/';
    console.log(obj);
    obj.url = baseURL+obj.url;
 }

})