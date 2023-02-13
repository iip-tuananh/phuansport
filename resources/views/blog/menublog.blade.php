<div class="col-md-3 hidden-sm hidden-xs sidebar-area">
   <div class="sidebar-blog">
      <div class="news-latest  clearfix">
         <div class="sidebarblog-title title_block">
            <h2>Bài viết mới nhất<span class="fa fa-angle-down"></span></h2>
         </div>
         <div class="list-news-latest layered">
            @foreach ($news as $blognew)
               <div class="item-article clearfix abc">
                  <div class="post-image">
                     <img src="{{$blognew->image}}" alt="">
                     <a href="{{route('detailBlog',['slug'=>$blognew->slug])}}"></a>
                  </div>
                  <div class="post-content">
                     <h3>
                        <a href="{{route('detailBlog',['slug'=>$blognew->slug])}}">{{languageName($blognew->title)}}</a>
                     </h3>
                     <span class="author">
                     </span>
                     <span class="date">
                   {{$blognew->created_at}}
                     </span>
                  </div>
               </div>
            @endforeach
          
         </div>
      </div>
   
   </div>
</div>