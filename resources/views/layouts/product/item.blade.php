@php
$img= json_decode($pro->images);
@endphp

<div class="col-md-3 col-sm-6 col-xs-6 pro-loop ">
   <div class="product-block" data-anmation="1">
      <div class="product-img fade-box">
         @if($pro->discount > 0)
         <div class="label_product"><span class="label_sale"> {{$pro->discount}}% </span></div>
         @endif
         <a href="{{route('detailProduct',['cate'=>$pro->cate_slug,'slug'=>$pro->slug])}}" class="image-resize">
            <picture>
               <source data-srcset="{{$img[0]}}" media="(max-width: 500px)" />
               <source data-srcset="{{$img[0]}}"	media="(max-width: 1024px)" />
               <source data-srcset="{{$img[0]}}" />
               <img data-src="{{$img[0]}}"
                  class="lazyload"
                  />
            </picture>
            @if(isset($img[1]))
            <picture>
               <source data-srcset="{{$img[1]}}" media="(max-width: 500px)" />
               <source data-srcset="{{$img[1]}}"	media="(max-width: 1024px)" />
               <source data-srcset="{{$img[1]}}" />
               <img data-src="{{$img[1]}}"
                  class="lazyload"
                  />
            </picture>
            {{-- @endisset --}}
            @else
            <picture>
               <source data-srcset="{{$img[0]}}" media="(max-width: 500px)" />
               <source data-srcset="{{$img[0]}}"	media="(max-width: 1024px)" />
               <source data-srcset="{{$img[0]}}" />
               <img data-src="{{$img[0]}}"
                  class="lazyload"
                  />
            </picture>
            @endif
         </a>
         <div class="button-add">
            <button onclick='window.location.href="{{route('detailProduct',['cate'=>$pro->cate_slug,'slug'=>$pro->slug])}}"' type="submit">Xem chi tiết</button>
         </div>
      </div>
      <div class="product-detail clearfix">
         <div class="box-pro-detail">
            <h3 class="pro-name">
               <a href="{{route('detailProduct',['cate'=>$pro->cate_slug,'slug'=>$pro->slug])}}" >
              {{languageName($pro->name)}}
               </a>
            </h3>
            <div class="box-pro-prices">
               @php
                   $giagiam = $pro->price-($pro->price*$pro->discount/100);
               @endphp
               @if($pro->price >0)
                  @if($pro->discount > 0)
                     <span class="price-cus">
                        {{number_format($giagiam,0,'','.')}} VNĐ
                     </span>
                     <del class="pro-price ">{{number_format($pro->price,0,'','.')}} VNĐ
                     </del>
                  @else
                     <span class="price-cus">
                        {{number_format($pro->price,0,'','.')}} VNĐ
                     </span>
                  @endif
               @else
               <span >
               <a class="price-cus" href="tel:+{{$setting->phone1}}"> Liên hệ</a>
               </span>
               @endif
            </div>
         </div>
      </div>
   </div>
</div>