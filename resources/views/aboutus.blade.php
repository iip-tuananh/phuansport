@extends('layouts.main.master')
@section('title')
Giới thiệu về {{$setting->company}}
@endsection
@section('description')
@endsection
@section('css')
<link href="{{asset('frontend/css/breadcrumb_style.scss.css')}}" rel="stylesheet" type="text/css" />
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
               <span class="mr_lr">&nbsp;&nbsp;</span>
            </li>
            <li>Giới thiệu</span></li>
         </ul>
      </div>
   </section>
   <section>
      <div class="container">
         {!!$pageContent->content!!}
         <ul>
            @if($setting->address1 != '')
             <li><span>Địa chỉ 1:</span>&nbsp;&nbsp;{{$setting->address1}}</li>
             <br>
             @endif
             @if($setting->address2 != '')
             <li><span>Địa chỉ 2:</span>&nbsp;&nbsp;{{$setting->address2}}</li>
             <br>
             @endif
             @if($setting->phone1 != '')
             <li><span>Điện thoại 1:</span><a href="tel:+{{$setting->phone1}}">&nbsp;&nbsp;{{$setting->phone1}}</a></li>
             <br>
             @endif
             @if($setting->phone2 != '')
             <li><span>Điện thoại 2:</span><a href="tel:+{{$setting->phone2}}">&nbsp;&nbsp;{{$setting->phone2}}</a></li>
             <br>
             @endif

             <li><span>Mail:</span> {{$setting->email}}</li>
          </ul>
          {!!$setting->iframe_map!!}
      </div>
   </section>
@endsection