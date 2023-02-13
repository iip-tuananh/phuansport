@extends('layouts.main.master')
@section('title')
{{languageName($product->name)}}
@endsection
@section('description')
@php
$discountPrice = $product->price - ($product->price * ($product->discount / 100));
@endphp
@endsection
@section('image')
@php

$color = json_decode($product->size);
$imgs = json_decode($product->images);
$promotion =  json_decode($product->preserve);
@endphp
@endsection
@section('css')
@endsection
@section('js')

@endsection
@section('content')
<main class="">
   <div id="product" class="productDetail-page">
      <div class="breadcrumb-shop">
         <div class="container">
            <div class="row">
               <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5  ">
                  <ol class="breadcrumb breadcrumb-arrows" itemscope itemtype="http://schema.org/BreadcrumbList">
                     <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <a href="/" target="_self" itemprop="item"><span itemprop="name">Trang chủ</span></a>
                        <meta itemprop="position" content="1" />
                     </li>
                     <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <a href="{{route('allListProCate',['cate'=>$product->cate->slug])}}" target="_self" itemprop="item">
                        <span itemprop="name">{{languageName($product->cate->name)}}</span>
                        </a>
                        <meta itemprop="position" content="2" />
                     </li>
                     <li class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <span itemprop="item" >
                        <span itemprop="name">{{languageName($product->name)}}</span>
                        </span>
                        <meta itemprop="position" content="3" />
                     </li>
                  </ol>
               </div>
            </div>
         </div>
      </div>
      <div class="container">
         <div class="row product-detail-wrapper">
            <div class="col-md-12 col-sm-12 col-xs-12">
               <div class="row product-detail-main pr_style_03">
                  <div class="col-md-8 col-sm-12 col-xs-12 product-content-img">
                     <div class="product-gallery">
                        <div class="product-gallery__thumbs-container hidden-sm hidden-xs">
                           <div class="product-gallery__thumbs thumb-fix">
                        
                        @foreach ($imgs as $img)
                                    <div class="product-gallery__thumb">
                                       <a class="product-gallery__thumb-placeholder" href="javascript:" data-image="{{$img}}" data-zoom-image="{{$img}}">
                                       <img  data-image="{{$img}}" src="{{$img}}" >
                                       </a>
                                    </div>
                        @endforeach
           
                           </div>
                        </div>
                        <div class="product-image-detail box__product-gallery scroll">
                           <ul id="sliderproduct" class="site-box-content slide_product clearfix hidden-lg hidden-md">
                              @foreach ($imgs as $img)
                                 <li class="product-gallery-item gallery-item">
                                    <img class="product-image-feature" src="{{$img}}" >
                                 </li>
                              @endforeach
                           </ul>
                           <div class="hidden-sm hidden-xs">
                              <img class="product-image-feature" src="{{$imgs[0]}}">
                           </div>
                           <div class="product-image__button">
                              <div id="product-zoom-in" class="product-zoom icon-pr-fix " aria-label="Zoom in" title="Zoom in">
                                 <span class="zoom-in" aria-hidden="true">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 36 36" style="enable-background:new 0 0 36 36; width: 30px; height: 30px;" xml:space="preserve">
                                       <polyline points="6,14 9,11 14,16 16,14 11,9 14,6 6,6 "/>
                                       <polyline points="22,6 25,9 20,14 22,16 27,11 30,14 30,6 "/>
                                       <polyline points="30,22 27,25 22,20 20,22 25,27 22,30 30,30 "/>
                                       <polyline points="14,30 11,27 16,22 14,20 9,25 6,22 6,30 "/>
                                    </svg>
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="product-description hidden-sm hidden-xs">
                        <div class="title-bl">
                           <h2>Mô tả</h2>
                        </div>
                        <div class="description-content">
                           <div class="description-productdetail">
                              {!!languagename($product->content)!!}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-md-4 col-sm-12 col-xs-12 product-content-desc" id="detail-product">
                     <div class="product-title">
                        <h1>{{languageName($product->name)}}</h1>
                     </div>
                     <div class="product-price" id="price-preview">
                        @php
                            $giagiam = $product->price-($product->price*$product->discount/100)
                        @endphp
                        @if($product->discount > 0)
                        Giảm : {{$product->discount}}%
                        <br>
                        <hr>
                     
                        <span class="pro-price" style="color: red">{{number_format($giagiam,0,'','.')}}₫</span>
                        <span><del>{{number_format($product->price,0,'','.')}}₫</del></span>
                        @else
                        <span class="pro-price" style="color: red">{{number_format($product->price,0,'','.')}}₫</span>
                        @endif
                     </div>
                    
                        <div class="select clearfix">
                           <select id="product-select" name="id" style="display:none;">
                              @php
                                  $sizeao = json_decode($product->size);
                     
                              @endphp
                              @foreach ($sizeao as $size)
                              <option value="{{$size->title}}">{{$size->title}}</option>
                              @endforeach
                           </select>
                        </div>
                   
                        <div class="select-swatch clearfix">
                           <div id="variant-swatch-0" class="swatch clearfix" data-option="option1" data-option-index="0">
                              <div class="header hide">Kích thước:</div>
                              <div class="select-swap">
                                 <input class="variant-0" id="swatch-0-den" type="text" name="color" value="" class="hidden"/>
                              @foreach ($sizeao as $item)
                        
                                    <div data-size="{{$item->title}}" class="n-sd swatch-element color click-color select-size">
                                 <label class="den has-thumb" for="swatch-0-den">
         
                                 <span class="custom-span" style="background-color: white">{{$item->title}}</span>
                                 </label>
                                    </div>
                              @endforeach                    
                           </div>
                        </div>
                        <script>
                              $(document).ready(function(){
                              $(".click-color").click(function(){ 
                                 var color = $(this).data('value');
                                 $(this).parent().find('input[name=color]').val(color);
                                 $('.click-color').removeClass('active');
                                 $(this).addClass('active');
                              })});
                              $('.selectsize').click(function(){
                           $(".span-cus").toggleClass("cus-la-new");
                           console.log(123);
                          })
                        </script>
                        <br>
                        <br>
                        <br>
                        <div class="custom custom-btn-numbers form-control">		
                       
                           <button 
                           onclick="var result = document.getElementById('qty'); 
                           var qty = result.value;
                           if( !isNaN(qty) & qty > 1 ) result.value--;return false;" 
                           class="btn-minus btn-cts" 
                           type="button">–</button>
                   
                           <input type="text" class="qty input-text" id="qty" name="quantity" size="4" value="1" maxlength="3" disabled/>
                   
                           <button onclick="var result = document.getElementById('qty'); var qty = result.value; 
                           if( !isNaN(qty)) result.value++;return false;" 
                           class="btn-plus btn-cts" 
                           type="button">+</button>
                           </div>
                           <input type="text" value="{{$product->id}}" name="idproduct" hidden/>
                     @if($product->price > 0)
                        <div class="selector-actions">
                           <div class="wrap-addcart clearfix">
                              <div class="row-flex">
                                 <button type="button" id="add-to-cart" data-url="{{route('addToCart')}}"  class="add-to-cart button btn-addtocart addtocart-modal" name="add"> 
                                 <span>	Thêm vào giỏ </span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     @else
                     <div class="selector-actions">
                        <div class="wrap-addcart clearfix">
                           <div class="row-flex">

                              <button onclick='window.location.href="tel:+{{$setting->phone1}}"' type="button" id="add-to-cart" class=" button btn-addtocart addtocart-modal" name="add"> 
                              <span>Liên Hệ</span>
                              </button>
                         
                           </div>
                        </div>
                     </div>
                     @endif
                        <script>
                           $('.add-to-cart').click(function() {
                              var id = $('input[name="idproduct"]').val();
                              var quantity = $('input[name="quantity"]').val();
                              var size = $('.select-size.active').data('size');
                              var url =  $(this).data('url');
                            
                              // console.log(id,quantity,size,url);
                              $.ajax({
                                 type: "post",
                                 url: url,
                                 headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                                 data: {
                                    size:size,
                                    quantity:quantity,
                                    id:id,
                                 },
                                 success: function (data) {
                                    
                                    $('.cart-view').html(data.html4);
                                    $('.count').html(data.html2);
                                    $('.style--sidebar').addClass('active show-cart');
                                    $('.site-overlay').addClass('active');
                                    
                                 }
                              });
                           });
                        </script>
                     <div class="product-description hidden-lg hidden-md">
                        <br>
                        <br>
                        <div class="title-bl">
                           <h2>Mô tả</h2>
                        </div>
                        <div class="description-content">
                           <div class="description-productdetail">
                              <p>{{languageName($product->name)}}</p>
                              {!!languageName($product->content)!!}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="list-productRelated clearfix">
                  <div class="heading-title text-center">
                     <h2>Sản phẩm liên quan</h2>
                  </div>
               </div>
               <div class="content-product-list row">
               @foreach ($productlq as $item)
               @if($item->id != $product->id)
                     @include('layouts.product.item',['pro'=>$item])
               @endif
               @endforeach
               </div>
            </div>
         </div>
      </div>
   </div>
   <div id="divzoom">
      <div class="divzoom_main">
         @foreach ($imgs as $img)
            <div class="product-thumb text-center">
               <img class="product-image-feature" src="{{$img}}">
            </div>
         @endforeach
      </div>
      <div id="positionButtonDiv" class="hidden">
         <p> 
            <span>
            <button type="button" class="buttonZoomIn"><i></i></button>
            <button type="button" class="buttonZoomOut"><i></i></button>			
            </span>
         </p>
      </div>
      <button id="closedivZoom"><i></i></button>
   </div>
<script>
       
      $(document).on("click","#product-zoom-in",function(){
      	//	var indexThumb = $(this).index();
      	$("body").addClass("open_layer");
      	$("#divzoom").css({'opcaity':0,'visibility':'hidden'}).show();
      	$('.divzoom_main').flickity({
      		resize:true,
      		draggable: true,
      	});
      	if($(window).width() > 768){
      		var ncurrent = parseInt($(".gallery-index .current").html()) - 1;
      	}
      	else{
      		var ncurrent = parseInt($(".product-gallery-item.is-selected").index());
      	}
      	$('.divzoom_main').flickity('select',ncurrent);
      	setTimeout(function(){$("#divzoom").css({'opcaity': 1,'visibility':'visible'})},50);
      });
      $(document).on('click','#closedivZoom', function(event) {
      	$("#divzoom").hide();
      	$("body").removeClass("open_layer");
      	$('.divzoom_main').flickity('select',0);
      	//$('.divzoom_main').slick('unslick');
      });
   </script>
   <script>
      $(".product-gallery__thumb img").click(function(){
      	$(".product-gallery__thumb").removeClass('active');
      	$(this).parents('.product-gallery__thumb').addClass('active');
      	var img_thumb = $(this).data('image');
      	var total_index =  $(this).parents('.product-gallery__thumb').index() + 1;
      	$(".gallery-index .current").html(total_index);
      	
      	$(".product-image-detail .product-image-feature").attr("src",$(this).attr("data-image"));
      });
      $(".product-gallery__thumb").first().addClass('active');
</script>
<script>

</script>
</main>
@endsection








