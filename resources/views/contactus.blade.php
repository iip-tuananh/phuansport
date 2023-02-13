@extends('layouts.main.master')
@section('title')
Liên hệ với chúng tôi
@endsection
@section('description')
Liên hệ với chúng tôi
@endsection
@section('image')
{{url(''.$setting->logo)}}
@endsection
@section('css')
<link href="{{asset('frontend/css/breadcrumb_style.scss.css')}}" rel="stylesheet" type="text/css" media="all" />
<link href="{{asset('frontend/css/style_page.scss.css')}}" rel="stylesheet" type="text/css" media="all" />
<link href="{{asset('frontend/css/contact_style.scss.css')}}" rel="stylesheet" type="text/css" media="all" />
@endsection
@section('js')
@endsection
@section('content')
<div class="bodywrap">
	<section class="bread-crumb">
	   <div class="container">
		  <ul class="breadcrumb" >
			 <li class="home">
				<a  href="{{route('home')}}" ><span >Trang chủ</span></a>						
				<span class="mr_lr">&nbsp;/&nbsp;</span>
			 </li>
			 <li><strong ><span>Liên hệ</span></strong></li>
		  </ul>
	   </div>
	</section>
	<h1 class="title-head-contact a-left d-none">Liên hệ</h1>
	<div class="layout-contact">
	   <div class="container">
		  <div class="row">
			 <div class="col-lg-6 col-12">
				<div class="contact">
				   <h4>
					  {{$setting->company}}
				   </h4>
				   <div class="time_work">
					  <div class="item">
						 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-map-marker-alt fa-w-12">
							<path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" class=""></path>
						 </svg>
						 <b>Hà Nội:</b>
								<ul>
								
										@if (isset($setting->address1))
											<li><a href="https://www.google.com/maps/place/Vinhome+Gardenia/@21.0367142,105.7602106,17z/data=!3m1!4b1!4m5!3m4!1s0x313455e2e14cbc67:0x8796754f084b19ad!8m2!3d21.0367283!4d105.762406?hl=vi" target="_blank" rel="noopener noreferrer">{{$setting->address1}}</a></li>
										@endif
										@if (isset($setting->address2) > 0)
											<li><a href="https://www.google.com/maps/place/55+Ng.+171+%C4%90.+Nguy%E1%BB%85n+Ng%E1%BB%8Dc+V%C5%A9,+Trung+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0109578,105.8053384,18z/data=!3m1!4b1!4m5!3m4!1s0x3135ac9fe56fce0f:0x6366e8daedcef88!8m2!3d21.0109553!4d105.8064327?hl=vi" target="_blank" rel="noopener noreferrer">{{$setting->address2}}</a></li>
										@endif
								</ul>
						
					  </div>
					  <div class="item">
						 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-map-marker-alt fa-w-12">
							<path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" class=""></path>
						 </svg>
						 <b>Tp Hồ Chí Minh:</b>
								<ul>
									<li><a href="https://www.google.com/maps/place/10%C2%B043'18.4%22N+106%C2%B039'42.3%22E/@10.721777,106.6595621,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xe5fad49a66ff560c!8m2!3d10.721777!4d106.6617508" target="_blank" rel="noopener noreferrer">Showroom 2 - 20 Đường số 1, KDC Phi Long, Bình Hưng, Bình Chánh</a></li>
								</ul>
						
					  </div>
					  <div class="item">
						 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-envelope fa-w-16">
							<path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" class=""></path>
						 </svg>
						 @if (isset($setting->email)) 
						 <b>Email:</b> <a href="mailto:{{$setting->email}}">{{$setting->email}}</a>
						 @endif
					  </div>
					  <div class="item">
						 <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-phone-alt fa-w-16">
							<path fill="currentColor" d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" class=""></path>
						 </svg>
						 <b>Hotline:</b> 
						 @if (isset($setting->phone1))
						<ul>
							<li>
								<a class="fone" href="tel:{{$setting->phone1}}">{{$setting->phone1}}</a>
							</li>
						 </ul>
						 @endif
						 @if (isset($setting->phone2))
						 <ul>
							<li>
								<a class="fone" href="tel:{{$setting->phone2}}">{{$setting->phone2}}</a>
							</li>
						 </ul>
						
						 @endif
						
					  </div>
				   </div>
				</div>
				<div class="form-contact">
				   <h4>
					  Liên hệ với chúng tôi
				   </h4>
				   <div id="pagelogin">
					  <form method="post" action="{{route('postcontact')}}" id="contact" accept-charset="UTF-8">
						@csrf
						 <div class="group_contact">
							<input placeholder="Họ và tên" type="text" class="form-control  form-control-lg" required value="" name="name">
							<input placeholder="Email" type="email" name="email">
							<input type="number" placeholder="Điện thoại*" name="phone"  class="form-control form-control-lg" required>
							<textarea placeholder="Nội dung" name="mess" id="comment" class="form-control content-area form-control-lg" rows="5"></textarea>
							<button type="submit" class="btn-lienhe">Gửi thông tin</button>
						 </div>
					  </form>
				   </div>
				</div>
			 </div>
			 <div class="col-lg-6 col-12">
				<div id="contact_map" class="map">
				{!!$setting->iframe_map!!}
				</div>
			 </div>
		  </div>
	   </div>
	</div>
@endsection
