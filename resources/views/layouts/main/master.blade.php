<!doctype html>
<html class="no-js" lang="vi" >
   <!--<![endif]-->
   <head>
      <meta charset="utf-8" />
      <!--[if IE]>
      <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <![endif]-->
      <!--[if lt IE 9]><script src="//hsta tic.net/0/0/global/design/theme-default/html5shiv.js"></script><![endif]-->
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>@yield('title')</title>
      <meta name="description" content="">
      <meta name="keywords" content="@yield('title')" />
      <meta name="robots" content="noodp,index,follow" />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
      <meta name="csrf-token" content="{{ csrf_token() }}" />
      <meta name="description" content="@yield('description')" />
      <link rel="canonical" href="{{ url()->current() }}" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="@yield('title')" />
      <meta property="og:description" content="@yield('description')" />
      <meta property="og:url" content="{{ url()->current() }}" />
      <meta property="og:site_name" content="{{ url()->current() }}" />
      <meta property="og:updated_time" content="2021-08-28T22:06:30+07:00" />
      <meta property="og:image" content="@yield('image')" />
      <meta property="og:image:secure_url" content="@yield('image')" />
      <meta property="og:image:width" content="598" />
      <meta property="og:image:height" content="333" />
      <meta property="og:image:alt" content="" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="@yield('title')" />
      <meta name="twitter:description" content="@yield('description')" />
      <meta name="twitter:image" content="@yield('image')" />
      <!-- Fav Icon -->
      <link rel="icon" href="{{ url('' . $setting->favicon) }}" type="image/x-icon">
      <link href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700&display=swap&subset=vietnamese" rel="stylesheet">
      <link rel="stylesheet" href="{{asset('frontend/css/bootrap.css')}}">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link href='{{asset('frontend/css/styles-new.css')}}' rel='stylesheet' type='text/css'  media='all'  />
      <link rel="stylesheet" href="{{asset('frontend/css/main.css')}}">
      <!--+++++++++++++++++++++++++  JS ++++++++++++++++++++++++-->
      <script src='{{asset('frontend/js/jquery.min.1.11.0.js')}}' type='text/javascript'></script>
      <link
         rel="stylesheet"
         href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"
         />
      <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
      <script type='text/javascript'>
         //<![CDATA[
         if ((typeof Haravan) === 'undefined') {
           Haravan = {};
         }
         Haravan.culture = 'vi-VN';
         Haravan.shop = 'loni-sport.myharavan.com';
         Haravan.theme = {"name":"LONI SPORT","id":1000522508,"role":"main"};
         Haravan.domain = 'lonisport.com';
         //]]>
      </script>
      <!-- Global site tag (gtag.js) - Google Ads: 655519344 -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-655519344"></script>
      <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         
         gtag('config', 'AW-655519344');
      </script>
      <meta name="google-site-verification" content="kXjhGSbLYQwYrn-1NOJrBGgHy0tWXQvJ279ZFgFnIeU" />
      <script defer src='{{asset('frontend/js/beacon.min.js')}}'></script>
      <style>.grecaptcha-badge{visibility:hidden;}</style>
      <script type='text/javascript'>
         window.HaravanAnalytics = window.HaravanAnalytics || {};
         window.HaravanAnalytics.meta = window.HaravanAnalytics.meta || {};
         window.HaravanAnalytics.meta.currency = 'VND';
         var meta = {"page":{"pageType":"home"}};
         for (var attr in meta) {
         	window.HaravanAnalytics.meta[attr] = meta[attr];
         }
         window.HaravanAnalytics.AutoTrack = true;
      </script>
      <script>
         //<![CDATA[
         window.HaravanAnalytics.ga = "UA-35427394-1";
         window.HaravanAnalytics.enhancedEcommerce = true;
         (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
         (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
         })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
         ga('create', window.HaravanAnalytics.ga, {cookieDomain: 'auto', siteSpeedSampleRate: '10',sampleRate: 100,allowLinker: true});
         ga('send', 'pageview'); ga('require', 'linker');ga('require', 'linker');
                         //]]>
                         
      </script>
      <script>
         window.HaravanAnalytics.fb = "308238836832077";
         //<![CDATA[
         !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
         n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
         n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
         t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
         document,'script','//connect.facebook.net/en_US/fbevents.js');
         // Insert Your Facebook Pixel ID below. 
         fbq('init', window.HaravanAnalytics.fb, {} , {'agent':'plharavan'});
         fbq('track', 'PageView');
         //]]>
      </script>
      <noscript><img height='1' width='1' style='display:none' src='https://www.facebook.com/tr?id=308238836832077&amp;ev=PageView&amp;noscript=1'/></noscript>
      <!-- Event snippet for PAGE_VIEW-0-03/28/2020 07:10:13 conversion page -->
      <script>
         gtag('event', 'conversion', {'send_to': 'AW-655519344/zttpCOy0wssBEPDcybgC'});
      </script>
      <!-- Messenger Plugin chat Code -->
      <div id="fb-root"></div>
      <!-- Your Plugin chat code -->
      <div id="fb-customer-chat" class="fb-customerchat">
      </div>
      <script>
         var chatbox = document.getElementById('fb-customer-chat');
         chatbox.setAttribute("page_id", "176957815762789");
         chatbox.setAttribute("attribution", "biz_inbox");
      </script>
      <!-- Your SDK code -->
      <script>
         window.fbAsyncInit = function() {
           FB.init({
             xfbml            : true,
             version          : 'v13.0'
           });
         };
         
         (function(d, s, id) {
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) return;
           js = d.createElement(s); js.id = id;
           js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      </script>
   </head>
   <body id="loni-sport" class="index">
      <div class="main-body">
         <div class="scroller">
            <div class="scroller-inner">
               <div class="promo-bar ">
                  <div class="container menu-top-cus">
                     <a href="{{route('aboutUs')}}">Giới thiệu </a>
                     <a href="{{route('allProduct')}}">Sản phẩm</a>
                     <a href="{{route('allListBlog')}}">Tin Tức</a>
                     <a href="tel:+{{$setting->phone1}}">Liên Hệ</a>
                  </div>
               </div>
               @include('layouts.header.index')
               @yield('content')
               <!-- 7. Gallery -->
               @include('layouts.footer.index')
               <div class="back-to-top hidden">
                  <a href="javascript:void(0);">
                     <div class="btt-back">
                        <span class="btt-label-back">back to top</span>
                        <span class="btt-icon-back"><i class="fa fa-long-arrow-up"></i></span>
                     </div>
                  </a>
               </div>
            </div>
         </div>
         <div id="site-nav--mobile" class="site-nav style--sidebar">
            <div id="site-navigation" class="site-nav-container">
               <div class="site-nav-container-last">
                  <p class="title">Menu</p>
                  <div class="main-navbar">
                     <nav id="mp-menu" class="mp-menu mp-cover" >
                        <div class="mp-level" data-level="1">
                           <div class="mplus-menu">
                              <ul class="mm-panel vertical-menu-list list-root">
                                 @foreach ($categoryProduct as $cate)
                                    <li class="parent-menu">
                                       <div class="flex-menu">
                                          <a class="parent" href="{{route('allListProCate',['cate'=>$cate->slug])}}">{{languageName($cate->name)}}</a><a class="open-type"><i class="fa-solid fa-plus"></i></a>
                                       </div>
                                       <ul class="type-ul" >
                                          @foreach ($cate->typecate as $type)
                                             <li class="type-li">
                                                <a href="{{route('allListProType',['cate'=>$type->cate_slug,'type'=>$type->slug])}}" ><span>-</span>&nbsp;{{languageName($type->name)}}</a>
                                             </li>
                                          @endforeach
                                       </ul>
                                    </li>
                                 @endforeach
                              </ul>
                              <script>
                               $('.fa-solid').click(function () { 
                                 $(this).parents().children('.type-ul').toggleClass('active');
                                 $(this).toggleClass('fa-plus fa-minus');
                                 
                               });
                              </script>
                        
                           </div>
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
            <div id="site-cart" class="site-nav-container" tabindex="-1">
               <div class="site-nav-container-last">
                  <p class="title">Giỏ hàng </p>
                  <div class="cart-view clearfix">
                     @if(count($cartcontent)>0)
                     <table id="clone-item-cart" class="table-clone-cart">
                     </table>
                     <table id="cart-view">
                        @php
                        $tong = 0;
                        @endphp
                        @foreach ($cartcontent as $item)
                        @php
                        $giagiam = $item['price']- ($item['price']*$item['discount']/100);
                        $tong += $giagiam*$item['quantity'];
                        @endphp
                        <tr>
                           <td class="img">
                              <a href="{{route('detailProduct',['cate'=>$item['cate_slug'],'slug'=>$item['slug']])}}">
                              <img src="{{$item['image']}} " />
                              </a>
                           </td>
                           <td>
                              <a class="pro-title-view" href="{{route('detailProduct',['cate'=>$item['cate_slug'],'slug'=>$item['slug']])}}" title="{{languageName($item['name'])}}">{{languageName($item['name'])}}</a>
                              <span class="variant">Size : {{$item['size']}}</span>
                              <span class="pro-quantity-view">{{$item['quantity']}}</span>
                              <span class="pro-price-view gia-do" >x {{number_format($giagiam,0,'','.')}}₫</span>
                              <span class="remove_link remove-cart">
                              <a href='javascript:void(0);' class="remove-item-cart" onclick="removeItemCart({{$item['id']}})" data-url="{{route('removeCart')}}" ><i class='fa fa-times'></i></a>
                              </span>				
                           </td>
                        </tr>
                        @endforeach
                     </table>
                     <span class="line"></span>
                     <table class="table-total">
                        <tr>
                           <td class="text-left">TỔNG TIỀN:</td>
                           <td class="text-right gia-do" id="total-view-cart">{{number_format($tong,0,'','.')}}₫</td>
                        </tr>
                        <tr>
                           <td><a href="{{route('listCart')}}" class="linktocart button dark">Xem giỏ hàng</a></td>
                           <td><a href="{{route('checkout')}}" class="linktocheckout button dark">Thanh toán</a></td>
                        </tr>
                     </table>
                     @else
                     <br>
                     <br>
                     Hiện tại không có sản phẩm nào trong giỏ hàng !
                     @endif
                  </div>
               </div>
            </div>
         
            <button id="site-close-handle" class="site-close-handle" aria-label="Đóng" title="Đóng">
            <span class="hamburger-menu active" aria-hidden="true"><span class="bar animate"></span></span>
            </button>
         </div>
         <div id="site-overlay" class="site-overlay"></div>
      </div>
      <!---- Event Facebook ------>
      <script defer></script>
      <!----- End Facebook Event ------->
      <script src='{{asset('frontend/js/plugins.js')}}' type='text/javascript'></script>
      <script src="{{asset('frontend/js/lazysizes.min.js')}}"></script>
      <script src='{{asset('frontend/js/scripts.js')}}' type='text/javascript'></script>
      <script>window.MBID="fj4WV8ohV";</script><script src="{{asset('frontend//js/sdk.js')}}"></script>
      @yield('js')
      <script>
         function btnMinus(e,n) {
             var id = e;
             var result = document.getElementById('qty'+id); var qtypro = result.value; if( !isNaN( qtypro ) && qtypro > 1 ) result.value--;
             var quantity = result.value;
             var url =n;
             $.ajax({
                 type:'get',
                 url:url,
                 data: {id:id, quantity:quantity},
                 success: function(data) {
                     // $('.top-cart-content').html(data.html1);
                     // $('.count_item_pr').html(data.html2);
                     $('.layout-cart').html(data.html3);
                     // $('.CartMobileContainer').html(data.html6);
                     $('.cart-view').html(data.html4);
                 }
             })
         }
         function btnPlus(e,n) {
            
             var id = e;
             var result = document.getElementById('qty'+id); var qtypro = result.value; if( !isNaN( qtypro )) result.value++;
             var quantity = result.value;
            
             var url = n;
             console.log(url);
             $.ajax({
                 type:'get',
                 url:url,
                 data: {id:id, quantity:quantity},
                 success: function(data) {
                     // $('.top-cart-content').html(data.html1);
                     // $('.count').html(data.html2);
                     $('.layout-cart').html(data.html3);
                     // $('.CartMobileContainer').html(data.html6);
                     $('.cart-view').html(data.html4);
                 }
             })
         }
         function removeItemCart(e) {
             var id = e
             var url = $('.remove-item-cart').data('url');
             $.ajax({
                 type: 'get',
                 url:url,
                 data: {id:id},
                 success: function(data) {
                     // $('.top-cart-content').html(data.html1);
                     $('.count').html(data.html2);
                     $('.layout-cart').html(data.html3);
                     // $('.CartMobileContainer').html(data.html6);
                     $('.cart-view').html(data.html4);
                 }
             })
         }
      </script>

      {{-- <script>
         $('.site-close-handle').click(function (e) { 
            e.preventDefault();
            $('.site-nav.style--sidebar').toggleClass('active');
            $('.site-overlay').toggleClass('active');
            $(".main-body").removeClass("sidebar-move");
         });
      </script> --}}
   </body>
</html>