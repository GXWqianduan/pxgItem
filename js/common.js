$(function () {
   // click事件移动端有延迟,mui框架中屏蔽了单击事件,默认行为
   // 解决方法是给a绑定tap事件,
   mui('body').on('tap','a',function(e){
      e.preventDefault();
      window.top.location.href=this.href;
   })
  // zepto导航拦截器
 $.ajaxSettings.beforeSend = function (xhr, obj) {
    const baseURL = 'http://140.143.222.79:8899/api/public/v1/';
   //  console.log(obj);
   // 添加遮罩
   //  $('body').addClass('loadding')
    obj.url = baseURL+obj.url;
 }
 $.ajaxSettings.complete=function () {
   //  console.log(1111);
    $('body').removeClass('loadding');

 }
})