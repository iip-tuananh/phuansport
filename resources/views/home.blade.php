@extends('layouts.main.master')
@section('title')
{{ $setting->company }}
@endsection
@section('description')
{{ $setting->webname }}
@endsection
@section('image')
{{ url('' . $banners[0]->image) }}
@endsection
@section('css')
@endsection
@section('js')
@endsection
@section('content')
<main class=" main-index	">
   <!-- 1. Slide -->
   <section class="section section-slider">
      <div id="home-slider" class="swiper mySwiperBanner">
         <div class="swiper-wrapper">
            @foreach ($banners as $banner)
            <div class="item fade-box swiper-slide">
               <a href="{{$banner->link}}">
                  <picture class="">
                     <source data-srcset="{{$banner->image}}" media="(max-width: 500px)" />
                     <source data-srcset="{{$banner->image}}" />
                     <img data-src="{{$banner->image}}" class="lazyload" />
                  </picture>
               </a>
            </div>
            @endforeach
         </div>
      </div>
   </section>
   <script>
       var swiper = new Swiper(".mySwiperBanner", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
   </script>
   <section class="section section-collection">
      <div class="wrapper-collection-1" >
         <div class="container" >
            <div class="wrapper-heading-home">
               <h2>
                  <a href="javascript:;">
                  Danh mục sản phẩm
                  </a>
               </h2>
            </div>
            <div class="row swiper mySwiper">
               <div class="clearfix content-product-list swiper-wrapper">
                  @foreach ($categoryProduct as $cate)
                  <div class="col-md-3 col-sm-6 col-xs-6 pro-loop swiper-slide">
                     <div class="product-block" data-anmation="1">
                        <div class="product-img fade-box">
                           <a href="{{route('allListProCate',['cate'=>$cate->slug])}}"  class="image-resize">
                              <picture>
                                 <source data-srcset="{{$cate->imagehome}}" media="(max-width: 500px)" />
                                 <source data-srcset="{{$cate->imagehome}}"	media="(max-width: 1024px)" />
                                 <source data-srcset="{{$cate->imagehome}}" />
                                 <img data-src="{{$cate->imagehome}}"
                                    class="lazyload"
                                    />
                              </picture>
                              <picture>
                                 <source data-srcset="{{$cate->imagehome}}" media="(max-width: 500px)" />
                                 <source data-srcset="{{$cate->imagehome}}" media="(max-width: 1024px)" />
                                 <source data-srcset="{{$cate->imagehome}}" />
                                 <img data-src="{{$cate->imagehome}}"
                                    class="lazyload"
                                    />
                              </picture>
                           </a>
                           <div class="button-add">
                              <button>Xem chi tiết</button>
                           </div>
                        </div>
                        <div class="product-detail clearfix">
                           <div class="box-pro-detail">
                              <h3 class="pro-name">
                                 <a href="{{route('allListProCate',['cate'=>$cate->slug])}}" title="{{languageName($cate->name)}}">
                                 {{languageName($cate->name)}}
                                 </a>
                              </h3>
                           </div>
                        </div>
                     </div>
                  </div>
                  @endforeach
               </div>
               <div class="swiper-pagination"></div>
            </div>
         </div>
      </div>
   </section>
   <script>
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 5,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
         100:{   slidesPerView: 2,
                  spaceBetween: 20,
                        },
               400:{   slidesPerView: 2,
                  spaceBetween: 20,
                        },
               640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
               1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
               },
               },
      });
   </script>
   @foreach ($categoryProduct as $key=>$cate)
   @if(count($cate->product)>0)
   @if($key %2 == 0)
   <section class="section section-collection ">
      <div class="wrapper-collection-1" >
         <div class="container" >
            <div class="wrapper-heading-home">
               <h2>
                  <a href="{{route('allListProCate',['cate'=>$cate->slug])}}">
                  {{languageName($cate->name)}}
                  </a>
               </h2>
               <div class="view-all">
                  <a href="{{route('allListProCate',['cate'=>$cate->slug])}}">Xem Thêm</a>
               </div>
            </div>
            <div class="row">
               <div class="clearfix content-product-list ">
                  @foreach ($cate->product as $key=>$pro)
                  @php
                  $img= json_decode($pro->images);
                  @endphp
                  @include('layouts.product.item',['pro'=>$pro])
                  @endforeach
               </div>
            </div>
         </div>
      </div>
   </section>
   @else
   <section class="section section-collection">
      <div class="wrapper-collection-1" >
         <div class="container" >
            <div class="wrapper-heading-home">
               <h2>
                  <a href="{{route('allListProCate',['cate'=>$cate->slug])}}">
                  {{languageName($cate->name)}}
                  </a>
               </h2>
               <div class="view-all">
                  <a href="{{route('allListProCate',['cate'=>$cate->slug])}}">Xem Thêm</a>
               </div>
            </div>
            <div class="row">
               <div class="clearfix content-product-list ">
                  @foreach ($cate->product as $key=>$pro)
                  @php
                  $img= json_decode($pro->images);
                  @endphp
                  @include('layouts.product.item',['pro'=>$pro])
                  @endforeach
               </div>
            </div>
         </div>
      </div>
   </section>
   @endif
   @endif
   @endforeach
   <section class="section wrapper-home-instagram">
      <div class="container">
         <div class="wrapper-heading-home">
            <div class="site-animation heading">
               <h2>
                  <a href="{{route('allListBlog')}}">
                  Blog - Tin tức
                  </a>
               </h2>
               <div class="view-all hidden">
                  <a href="{{route('allListBlog')}}">Xem Thêm</a>
               </div>
            </div>
         </div>
         <div class="swiper mySwiperblog">
            <div class="posts-list row swiper-wrapper">
               @foreach ($Blogs as $blog)
               <div class="col-md-4 col-sm-6 col-xs-12 col-post swiper-slide">
                  <div class="post_item">
                     <div class="post_featured">
                        <div class="post_thumb fade-box">
                           <a class="hover_icon" href="{{route('detailBlog',['slug'=>$blog->slug])}}" >
                              <picture>
                                 <source data-srcset="{{$blog->image}}" media="(max-width: 500px)" />
                                 <source data-srcset="{{$blog->image}}" />
                                 <img data-src="{{$blog->image}}" class="lazyload" />
                              </picture>
                           </a>
                        </div>
                     </div>
                     <div class="post_content">
                        <div class="post_info">
                           <span class="post_info_item"> 
                           <i style="color: rgb(1, 9, 87)">{{$blog->created_at}}</i>
                           </span>
                        </div>
                        <h3 class="post_title">
                           <a href="{{route('detailBlog',['slug'=>$blog->slug])}}">{{languageName($blog->title)}}</a>
                        </h3>
                        <div class="post_descr limit-text-3">
                           {{languageName($blog->description)}}
                        </div>
                     </div>
                  </div>
               </div>
               @endforeach
            </div>
            <div class="swiper-pagination"></div>
         </div>
         <script>
            var swiper = new Swiper(".mySwiperblog", {
              slidesPerView: 3,
              spaceBetween: 30,
              pagination: {
                el: ".swiper-pagination",
              },
              breakpoints: {
               200:{   slidesPerView: 2,
                  spaceBetween: 20,
                        },
               640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
               },
               768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
               1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
               },
               },
            });
         </script>
      </div>
   </section>
   <section class="section wrapper-home-newsletter lazyload">
      <div class="container-fluid">
         <div class="content-newsletter">
            <h2>Đăng ký</h2>
            <p>Đăng ký  để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác.</p>
            <div class="form-newsletter">
               <form accept-charset='UTF-8' action='{{route('postcontact')}}' class='contact-form' method='post'>
                  @csrf
                  <div class="form-group">
                     <input required type="email" value="" placeholder="Nhập email của bạn" name="email"  aria-label="Email Address" class="inputNew form-control grey newsletter-input">
                     <button type="submit"  class="button submitNewsletter"><span>Gửi</span></button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </section>
</main>
@endsection