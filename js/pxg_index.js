$(function () {
  banner();
  prolist();
})

  function banner() {
    // 发起ajax渲染轮播图
    $.ajax({
    tpye:'get',
    url: 'home/swiperdata',
    datatype:'json',
    success:function(result){
      // console.log(result);
      if ( result.meta.status==200){
        var bannerHtml = template('pyg_bannerTemp', result)
        // console.log(bannerHtml);
        $('.pyg_indexbanner').html(bannerHtml)
        var indicatorHtml = template('indicatorTemp', result)
        $('.mui-slider-indicator').html(indicatorHtml)
  
        //获得slider插件对象
        mui('.mui-slider').slider({
          interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
      }  
    }
    })
  }
  function prolist(){
    $.ajax({
    tpye:'get',
    url: 'home/goodslist',
    datatype:'json',
    success:function(result){
      // console.log(result);
     if (result.meta.status == 200){
       var prohtml = template('proTemp',result)
      //  console.log(prohtml);
      $('.pxg_pro').html(prohtml) 
     }
    }
    })
  }