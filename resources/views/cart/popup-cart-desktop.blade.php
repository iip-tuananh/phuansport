@if(count($cart)>0)
<table id="clone-item-cart" class="table-clone-cart">
    <tr class="item_2 hidden">
       <td class="img"><a href="" title=""><img src="" alt="" /></a></td>
       <td>
          <a class="pro-title-view" href="" title=""></a>
          <span class="variant"></span>	
          <span class="pro-quantity-view"></span>
          <span class="pro-price-view"></span>
          <span class="remove_link remove-cart">					
          </span>				
       </td>
    </tr>
 </table>
 <table id="cart-view">
    @php
    $tong = 0;
    @endphp
    @foreach ($cart as $item)
    {{-- @dd($cartcontent); --}}
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
 <br><br>
 Hiện tại không có sản phẩm nào trong giỏ hàng !
 @endif