<div class="col-md-12 col-xs-12">
   <div class="row">
      <div class="col-md-9 col-xs-12">
         <h1 class="heading-cart">Giỏ hàng của bạn</h1>
         <div class="list-pageform-cart">
            <form action="{{route('checkout')}}" method="post" id="cartformpage">
               @csrf
               <div class="cart-row">
                  <h2 class="title-number-cart">
                     Bạn đang có <span>{{count($cart)}} sản phẩm</span> trong giỏ hàng
                  </h2>
                  <div class="table-cart">
                     @php
                         $tong = 0;
                     @endphp
                     @foreach ($cart as $item)
                     @php
                         $giagiam = $item['price']-($item['price']*$item['discount']/100);
                         $thanhtien = $giagiam*$item['quantity'];
                         $tong += $giagiam*$item['quantity'];
                     @endphp
                        <div class="item line-item line-item-container" data-variant-id="1098659921">
                           <div class="left">
                              <div class="item-img">
                                 <a href="{{route('detailProduct',['cate'=>$item['cate_slug'],'slug'=>$item['slug']])}}">
                                 <img src="{{$item['image']}}" alt="{{languageName($item['name'])}}" />
                                 </a>
                              </div>
                           </div>
                           <div class="right">
                              <div class="item-info">
                                 <a href="{{route('detailProduct',['cate'=>$item['cate_slug'],'slug'=>$item['slug']])}}">
                                    <h3>{{languageName($item['name'])}}</h3>
                                    <div class="item-desc">
                                       <span class="variant_title">Size : {{$item['size']}}</span>
                                    </div>
                                 </a>
                              </div>
                              <div class="item-quan">
                                 <div class="custom custom-btn-numbers form-control">		
                                    <button 
                                    onclick="btnMinus('{{$item['id']}}','{{route('updateCart')}}')" 
                                    class="btn-minus btn-cts" 
                                    type="button">–</button>
                            
                                    <input type="text" class="qty input-text" id="qty{{$item['id']}}" name="quantity" size="4" value="{{$item['quantity']}}" maxlength="3" disabled/>
                            
                                    <button onclick="btnPlus('{{$item['id']}}','{{route('updateCart')}}')" 
                                    class="btn-plus btn-cts" 
                                    type="button">+</button>
                                    </div>
                              </div>
                              <div class="item-price">
                                 <p>
                                    <span class="gia-do">{{number_format($giagiam,0,'','.')}}₫</span>
                                 </p>
                              </div>
                              <div class="item-total-price">
                                 <div class="price">
                                    <span class="text">Thành tiền:</span>
                                    <span class="line-item-total gia-do">{{number_format($thanhtien,0,'','.')}}₫</span>
                                 </div>
                                 <div class="remove">
                                    <a href='javascript:void(0);' class="remove-item-cart" onclick="removeItemCart({{$item['id']}})" data-url="{{route('removeCart')}}" ><i class="fa-solid fa-trash-can"></i></a>
                             
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     @endforeach
                  </div>
               </div>
           
            </form>
         </div>
      </div>
      <div class="col-md-3 col-xs-12 sidebar-cart-fix">
         <a href="{{route('home')}}" class="continue">Tiếp tục mua hàng →</a>
         <div class="order-summary-block">
            <h2 class="order-summary-title">Thông tin đơn hàng</h2>
            <div class="summary-subtotal hidden">
               <p class="subtotal">Tạm tính:
                  <span class="cart-total-price gia-do">
                     {{number_format($tong,0,'','.')}}₫
                  </span>
               </p>
               <p class="shipping clearfix">Phí vận chuyển:
                  <span>---</span>
               </p>
            </div>
            <div class="summary-total">
               <p>Tổng tiền: <span class="gia-do"> {{number_format($tong,0,'','.')}}₫</span>
               </p>
            </div>
            @if(count($cart)>0)
            <div class="summary-action">
               <p>Tiến hành thanh toán</p>
               <a class="checkout-btn" href="{{route('checkout')}}">THANH TOÁN</a>
            </div>
            @endif
         </div>
         <div class="get-code">
         </div>
      </div>
      <div class="col-md-9 col-xs-12">
         <!-- Nhóm SP -->
    <br>
    <br><br><br>
      </div>
   </div>
</div>   