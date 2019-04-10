$(function () {

  // 加入购物车必要参数,商品对象的JSON字符串
  var info = {
    cat_id: '',
    goods_id: '',
    goods_name: '',
    goods_number: '',
    goods_price: '',
    goods_small_logo: '',
    goods_weight: ''
  }
  // console.log($.getParameter(location.search));
  $.ajax({
    tpye: 'get',
    url: 'goods/detail',
    data: $.getParameter(location.search),
    datatype: 'json',
    success: function (result) {
      // console.log(result.data);
      // console.log(result);
      // 为info赋值,加购物车必要信息
      info.cat_id = result.data.cat_id
      info.goods_id = result.data.goods_id
      info.goods_name = result.data.goods_name
      info.goods_number = result.data.goods_number
      info.goods_price = result.data.goods_price
      info.goods_small_logo = result.data.goods_small_logo
      info.goods_weight = result.data.goods_weight

      var banhtml = template('proDetails', result.data)
      $('.pxg_banner').html(banhtml)
      var html = template('proSpecification', result.data)
      $('.protab').html(html)
      // 区域滑动
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      //获得slider插件对象
      mui('.mui-slider').slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

    }
  })

  // 商品添加购物车  ,token会过期
  $('.btn-addCart').on('tap', function () {
    // 1.判断是否有token，如果没有，则重定向到登陆页面
    // 约定使用sessionStorage存储
    var mytoken = sessionStorage.getItem('pyg_token')    //这步获取用户的token
    // sessionStorage.setItem('redirectUrl',location.href)
    // // 2.如果有token,那么就发送请求
    console.log(mytoken)
    if (!mytoken) {          //没有登录跳转登录
      sessionStorage.setItem('redirectUrl', location.href)
      // location.href = '../views/login.html'
      location.href = './login.html?redirectUrl=' + escape(location.href)
    } else {
      $.ajax({    //有登录跳转购物车页面
        type: 'post',
        url: 'my/cart/add',
        data: { info: JSON.stringify(info) },
        datatype: 'json',
        success: function (result) {
          // 跳转购物车页面
          console.log(result);
          // debugger;
          if (result.meta.status == 401) {
            sessionStorage.setItem('redirectUrl', location.href)   //未登录后面的参数
            // location.href = '../views/login.html'
            // 通过url编码来实现href的传递
            location.href = './login.html?redirectUrl=' + escape(location.href)
          } else {
            // 提示消息框
            mui.confirm('添加成功，是否查看购物车？', '温馨提示', ['跳转', '取消'], function (e) {
              // index代表当前按钮的索引，索引从0开始
              if (e.index == 0) {
                // 跳转到购物车页面
                location.href = '../views/cart.html'
              } else {
                
              }
            })
          }
        }
      })
    }

    // 3.接收返回结果，如果是token过期，则重新登陆--重定向到登陆页

    // 4.如果有效，那么就弹出提示：添加成功，是否查看购物车

  })

})