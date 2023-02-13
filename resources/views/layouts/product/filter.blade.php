<div class="row margin">
   @foreach ($products as $pro)
   @php
$img= json_decode($pro->images);
@endphp
<div class="col-md-3 col-sm-6 col-xs-6 pro-loop">
   <div class="product-block" data-anmation="1">
      <div class="product-img fade-box">
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
            <button type="submit" title="Mua ngay" class="action" onclick="buy_now('1098037236')">Mua ngay</button>
            <button type="submit" title="Thêm vào giỏ" class="action add-to-cart" data-variantid="1098037236">Thêm vào giỏ</button>
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
               <p class="pro-price price-cus">{{number_format($pro->price,0,'','.')}} VNĐ
               </p>
            </div>
         </div>
      </div>
   </div>
</div>
   @endforeach
</div>
<script>
   $('.quick-view-pro').click(function(){
       var id = $(this).data('id');
       var url = $(this).data('url');
       console.log(id, url);
       $.ajax({
           type : 'POST',
           url : url,
           headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
           data: {id : id},
           success:function(data){
               $('#quick-view-product').css("display", "block");
               $('#quick-view-product').html(data.html);
           }
       })
   })
</script>