var params = {
	condition: '',
	pages: 0
};

$(function() {
	params.condition = getUrlParam('search_text');
	$.get('/getMusic', {
		search_text: params.condition
	}, function(result) {
		var htmlElement = '';
		if(result.musics.length === 0) {
			htmlElement +=	'<p class="ul"></p>'
						+ 	'<p> 没有找到相关内容，换个搜索词试试吧 </p>'
		} else {
			var pageLen = result.count;
			loadData(result.musics.length, result.musics);
			params.pages = Math.ceil(pageLen / 3);
			if(params.pages > 0) {
				var index = 0;
				htmlElement += '<div class="paginator">'
							+	'<span onclick="prevPage()" class="prev">'
							+		'<前页'
							+	'</span>'
				for(var i = 1; i <= params.pages; i++) {
					index = i -1;
					htmlElement += '<a onclick="skip(this)" href="javascript:void(0)" data-index="'+	index	+'">'
								+	i
								+	'</a>'
				}
				htmlElement +=	'<span onclick="nextPage()" class="next">'
							+			'后页>'
							+	'</span>'
							+'</div>'
				$('.pages').append(htmlElement);
				var alist = $('.paginator a');
				$(alist[0]).addClass('thispage');	
			}
		}
	});

});     
		
// 向前翻页
function prevPage() {
	var alist = $('.paginator a');
	var currentIndex = parseInt($('.thispage').attr('data-index'));
	$('.thispage').removeClass('thispage');
	if(currentIndex === 0) {
		$(alist[params.pages-1]).addClass('thispage');
		currentIndex = params.pages-1;
	} else {
		$(alist[currentIndex-1]).addClass('thispage');
		currentIndex = currentIndex-1;
	}
	getPageOfData(currentIndex);
}

// 向后翻页
function nextPage() {
	var alist = $('.paginator a');
	var currentIndex = parseInt($('.thispage').attr('data-index'));
	$('.thispage').removeClass('thispage');
	if(currentIndex === params.pages-1) {
		$(alist[0]).addClass('thispage');
		currentIndex = 0;
	} else {
		$(alist[currentIndex+1]).addClass('thispage');
		currentIndex = currentIndex+1;
	}
	getPageOfData(currentIndex);
}

// 选择对应的页
function skip(e) {
	$('.paginator a').removeClass('thispage');
	$(e).addClass('thispage'); 
	var index = $(e).attr('data-index');
	getPageOfData(index);
}

// 获取对应页的数据
function getPageOfData(index) {
	$.get('/getMusic', {
		search_text: params.condition,
		index: index
	}, function(result) {
		loadData(result.musics.length, result.musics);
	});
}

// 加载数据
function loadData(len,data) {
	console.log('data :' + data[0]._id);
	var htmlElement = '';
	$('.content').html('');
	for(var i = 0; i < len; i++) {
		htmlElement += '<p class="ul"></p>'
					+	'<table>' 
					+		'<tbody>'
					+			'<tr class="item">'
					+				'<td width="100" valign="top">'
					+					'<a class="nbg" href="/music/'	+	data[i]._id	+'">'
					+						'<img src="'	+	data[i].poster		+'" style="width: 81px;height: 	81px"/>'
					+					'</a>'
					+				'<td>'
					+				'<td valign="top">'
					+					'<div class="pl2">'
					+						'<a href="/music/'	+	data[i]._id	+	'">'
					+							data[i].title
					+						'</a>'
					+						'<p>' 
					+							data[i].genres			
					+						'</p>'
					+						'<div class="star clearfix">'
					+							'<span class="allstar45"></span>'
					+							'<span class="rating_nums">'
					+								data[i].score	
					+							'</span>'
					+							'<span class="pl"> (  '
					+								data[i].pv	
					+							'  人评价)</span>'
					+						'</div>'
					+					'</div>'
					+		'</tbody>'
					+	'</table>'																					
	}

	$('.content').append(htmlElement);	
}

// 获取地址栏的任务ID
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
}