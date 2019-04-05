$(function () {
  // zepto导航拦截器
 $.ajaxSettings.beforeSend = function (xhr, obj) {
    const baseURL = 'http://157.122.54.189:9094/api/public/v1/';
    console.log(obj);
    obj.url = baseURL+obj.url;
 }

})