<footer class="main-footer" style="background-color: green; color:white; padding:10px 10px">
    <div class="main-footer--bottom">
       <div class="container">
          <div class="">
             <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg">
                   <div class="footer-col footer-block">
                      <h4 class="footer-title">
                        <img src="{{$setting->logo}}" alt="" srcset="">
                      </h4>
                      <div class="footer-content">
                        {{$setting->company}}
                         
                      </div>
                   </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg">
                   <div class="footer-col footer-link">
                      <h4 class="footer-title">
                         HỖ TRỢ KHÁCH HÀNG
                      </h4>
                      <div class="footer-content toggle-footer">
                         <ul>
                           @foreach ($servicehome as $item)
                              <li class="item">
                                 <a href="{{route('serviceDetail',['slug'=>$item->slug])}}" title="{{$item->title}}">{{$item->name}}</a>
                              </li>
                           @endforeach
                         </ul>
                      </div>
                   </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg">
                   <div class="footer-col footer-block">
                      <h4 class="footer-title">
                         Thông tin liên hệ
                      </h4>
                      <div class="footer-content toggle-footer">
                         <ul>
                           @if($setting->address1 != '')
                            <li><span>Địa chỉ 1:</span>&nbsp;&nbsp;{{$setting->address1}}</li>
                            @endif
                            @if($setting->address2 != '')
                            <li><span>Địa chỉ 2:</span>&nbsp;&nbsp;{{$setting->address2}}</li>
                            @endif
                            @if($setting->phone1 != '')
                            <li><span>Điện thoại 1:</span><a href="tel:+{{$setting->phone1}}">&nbsp;&nbsp;{{$setting->phone1}}</a></li>
                            @endif
                            @if($setting->phone2 != '')
                            <li><span>Điện thoại 2:</span><a href="tel:+{{$setting->phone2}}">&nbsp;&nbsp;{{$setting->phone2}}</a></li>
                            @endif
         
                            <li><span>Mail:</span> {{$setting->email}}</li>
                         </ul>
                      </div>
                   </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg">
                   <div class="footer-col footer-block">
                      <h4 class="footer-title">
                         FANPAGE
                      </h4>
                      <div class="footer-content">
                         <!-- Facebook widget -->						
                         <div class="footer-static-content">
                            <div class="fb-page" data-href="{{$setting->facebook}}"  data-height="300" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false">	</div>
                         </div>
                         <div style="clear:both;" ></div>
                         <!-- #Facebook widget -->
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    <div class="main-footer--copyright">
       <div class="container">
          <div class="main-footer--border">
             <p  style="color:white">Copyright © 2023 &nbsp;<a href="{{route('home')}}"  style="color:white">    {{$setting->company}}</a>. <a   style="color:white" target='_blank' href='https://sbtsoftware.vn/'>&nbsp;Powered by SBT</a></p>
          </div>
       </div>
    </div>
    <script>
      $('.footer-title').click(function (e) { 
         e.preventDefault();
         $(this).parents().children('.footer-content').toggleClass('active');
         
      });
    </script>
 </footer>