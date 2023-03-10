<header class="main-header ">
    <div class="container">
       <div class="row row-flex">
          <div class="col-md-2 col-sm-5 col-xs-5">
             <div class="main-header--logo fade-box" itemscope="" itemtype="http://schema.org/Organization">
                <a href="{{route('home')}}" itemprop="url">
                   <h1 class="logo">
                      <img itemprop="logo" src="{{$setting->logo}}"  class="img-responsive logoimg lazyload"/>
                   </h1>
                </a>
             </div>
          </div>
          <div class="col-md-8 hidden-sm hidden-xs">
             <div class="main-header--menu">
                <nav class="desk-menu">
                   <ul class="">
                    @foreach ($categoryProduct as $cate)
                        <li class="">
                        <a href="{{route('allListProCate',['cate'=>$cate->slug])}}" title="{{languageName($cate->name)}}"> 
                      {{languageName($cate->name)}}
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </a>
                        <ul class="sub_menu">
                           @foreach ($cate->typecate as $type)
                              <li class="">
                                 <a href="{{route('allListProType',['cate'=>$type->cate_slug,'type'=>$type->slug])}}" > 
                                    {{languageName($type->name)}}
                                 </a>
                              </li>
                           @endforeach
                        </ul>
                        </li>
                    @endforeach
                   </ul>
                </nav>
             </div>
          </div>
          <div class="col-md-2 col-sm-7 col-xs-7">
             <div class="main-header--action row-flex">
                {{-- <div class="action--search" id="site-search-handle">
                   <a href="/search">
                      <svg class="svg-search" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 451 451" style="enable-background:new 0 0 451 451;" xml:space="preserve">
                         <g>
                            <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3   s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4   C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3   s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"></path>
                         </g>
                      </svg>
                   </a>
                </div> --}}
                <div class="action-cart" id="site-cart-handle">
                   <a href="{{route('listCart')}}">
                      <span class="cart-menu" aria-hidden="true">
                         <svg class="svg-cart" xmlns="http://www.w3.org/2000/svg" height="456pt" viewBox="0 -13 456.75885 456" width="456pt">
                            <path d="m150.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
                            <path d="m446.855469 94.035156h-353.101563l-7.199218-40.300781c-4.4375-24.808594-23.882813-44.214844-48.699219-48.601563l-26.101563-4.597656c-5.441406-.96875-10.632812 2.660156-11.601562 8.097656-.964844 5.441407 2.660156 10.632813 8.101562 11.601563l26.199219 4.597656c16.53125 2.929688 29.472656 15.871094 32.402344 32.402344l35.398437 199.699219c4.179688 23.894531 24.941406 41.324218 49.199219 41.300781h210c22.0625.066406 41.546875-14.375 47.902344-35.5l47-155.800781c.871093-3.039063.320312-6.3125-1.5-8.898438-1.902344-2.503906-4.859375-3.980468-8-4zm-56.601563 162.796875c-3.773437 12.6875-15.464844 21.367188-28.699218 21.300781h-210c-14.566407.039063-27.035157-10.441406-29.5-24.800781l-24.699219-139.398437h336.097656zm0 0"></path>
                            <path d="m360.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0"></path>
                         </svg>
                         <span class="count-holder"><span class="count">{{count($cartcontent)}}</span></span>
                      </span>
                   </a>
                </div>
                &nbsp; &nbsp; &nbsp;
                <div class="action--bar hamburger-menu hidden-lg hidden-md" id="site-menu-handle">
						<span class="bar"></span>
					</div>
             </div>
          </div>
       </div>
    </div>
 </header>