window.onload = function() {
	$('div.player-round-btn-bg').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});

	$('.span-player-round-btn').click(function() {
		alert(); // 弹框
	});


	// 获取第一个分类
	var firstItem = $('.section-titles a')[0];
	$(firstItem).parent().addClass('on');
	var firstItemVal = $(firstItem).text();
	getDataOfCurrentItem(firstItemVal);

	// 音乐分类选项栏点击事件
    $('.section-titles li a').click(function(e) {
        $('.section-titles li').removeClass('on');
        $(this).parent().addClass('on');
        e.preventDefault();
        var item = $(this).text();
        getDataOfCurrentItem(item);
    });

    // 新歌榜歌曲点击事件
    $('span.icon').click(function(e) {
    	window.location.href = $(this).attr('data-musicUrl');
    });

    // 添加新歌榜序号
    var newSongs = $('.hot-artist-songs li span.rank');
    for(var i = 0, len = newSongs.length; i < len; i++) {
    	$(newSongs[i]).text(i + 1);
    }
}

// 获取当前分类下的数据
function getDataOfCurrentItem(item) {
	$('.album-content').html('');
	$.get('/getDataOfCurrentItem', {
		musicCategoryName: item
	}, function(result) {
		var len = result.musics.length;
		if(len > 0) {
			var htmlEle = '';
			for(var i = 0; i < len; i++) {
				htmlEle += '<div class="album-item">'
						+		'<div class="inner">'
						+			'<a href="/music/' + result.musics[i]._id +'" target="_blank">'
						+				'<div class="cover">'
						+					'<img width="100%" src="' + result.musics[i].poster +'"/>'
						+				'</div>'
						+			'</a>'
						+			'<a class="album-title" href="#">' + result.musics[i].title 
						+			'</a>'
						+			'<p>' + result.musics[i].author 
						+			'<div class="star clearfix">'
						+				'<span class="allstar' + result.musics[i].starScore  +'">'
						+				'</span>'
						+				'<span class="score' + result.musics[i].starScore  +'">' 
						+ 					result.musics[i].score
						+				'</span>'
						+			'</div>'
						+		'</div>'
						+	'</div>'
			}
			$('.album-content').append(htmlEle);
		}
	});
}