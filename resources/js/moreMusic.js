var param = {};

window.onload = function() {
	// 初始化电影分类栏样式
	var categories = $('.tags .tag-list .category');
	var firstCate = categories[0];
	$(firstCate).addClass('activate');
	param.item = $('.tags .tag-list label.activate').text();
	getDataOfCategoryOrder(param.item);

	// 电影分类选项栏点击事件
	$('.tags .tag-list label').click(function() {
		$('.tags .tag-list label').removeClass('activate')
		$(this).addClass('activate');
		param.item = $(this).text();
		$('.list-wp a.more').attr('data-skip', '8');
		getDataOfCategoryOrder(param.item);
	});

	// 点击按不同的方式排序
	$('.sort input').click(function() {
		$("input[name='sort']:checked").removeAttr('checked');
		$(this).attr('checked', 'checked');
		$('.list-wp a.more').attr('data-skip', '8');
		getDataOfCategoryOrder(param.item);
	});

	// 点击加载更多
	$('.list-wp a.more').click(function() {
		var skip = parseInt($(this).attr('data-skip'));
		loadMore(skip, param.item);
	});
}

// 获取当前分类的数据

function getDataOfCategoryOrder(item) {
	var sort = $("input[name='sort']:checked").val();
	$('.list-wp .list').html('');
	$.get('/getMusicDataOfCategoryOrder', {
		musicCategoryName: item,
		sort: sort
	}, function(result) {
	var len = result.musics.length;
	if(len > 0) {
		loadCategoryMusicData(len, result);
	}
	});
}

//加载分类模块的数据
function loadCategoryMusicData(len, result) {
	var htmlEle = '';
	for (var i = 0; i < len; i++) {
		htmlEle += '<a href="/music/' + result.musics[i]._id + '" target="_blank" class="item">' 
				+		'<div class="cover-wp">'
				+			'<img src="' + result.musics[i].poster + '" />'
				+		'</div>'
				+ 		'<p>' + result.musics[i].title + '&nbsp;'
				+			'<strong>' + result.musics[i].score
				+ 		'</p>'
				+	'</a>'

	}
	$('.list-wp .list').append(htmlEle);
}

// 加载更多电影
function loadMore(skip, item) {
	var sort = $("input[name='sort']:checked").val();
	$.get('/getMusicDataOfCategoryOrder', {
	  musicCategoryName: item,
	  skip: skip,
	  sort: sort
	}, function(result) {
	  var len = result.musics.length;
	  if(len > 0) {
	    loadCategoryMusicData(len, result);
	    $('.list-wp a.more').attr('data-skip', skip + 8 + '');
	  } else {
	  	alert('已加载到末尾了哦~');
	  }
	});
}
