@extends('layouts.main.master')
@section('title')
{{ languageName($blog_detail->title) }}
@endsection
@section('description')
{{ languageName($blog_detail->description) }}
@endsection
@section('image')
{{ url('' . $blog_detail->image) }}
@endsection
@section('css')

@endsection
@section('js')

@endsection
@section('content')
<main class="">
   <div id="article">
      <div class="breadcrumb-shop">
         <div class="container">
            <div class="row">
               <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5 blog-breadcrumb ">
                  <ol class="breadcrumb breadcrumb-arrows" itemscope itemtype="http://schema.org/BreadcrumbList">
                     <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <a href="{{route('home')}}" target="_self" itemprop="item"><span itemprop="name">Trang chủ</span></a>
                        <meta itemprop="position" content="1" />
                     </li>
                     <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <a href="{{route('allListBlog')}}" itemprop="item">
                        <span itemprop="name">Tin tức</span>
                        </a>
                        <meta itemprop="position" content="2" />
                     </li>
                     <li class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                        <span itemprop="item"><span itemprop="name">{{languageName($blog_detail->title)}}</span></span>
                        <meta itemprop="position" content="3" />
                     </li>
                  </ol>
               </div>
            </div>
         </div>
      </div>
      <div class="container">
         <div class="row wrapper-row pd-page">
            @include('blog.menublog')
            <div class="col-md-9 col-sm-12 col-xs-12 article-area">
               <div class="content-page">
                  <div class="article-content">
                   {!!languageName($blog_detail->content)!!}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <br>
  
</main>
@endsection