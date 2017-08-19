$(function() {
	$('.del').click(function(e) {
		var target = $(e.target);
		var id = target.data('id');
		$.get('/deleteMovie', {
			id : id
		}, function(result) {
			if(result.flag === true || result.flag === 'true') {
				refresh();
			} else {
				alert('删除失败');
			}
		});
    });

    $('#inputDoubanId').blur(function(e) {
    	var doubanId = $(this).val();
    	if(doubanId) {
	    	$.ajax({
	    		url: 'https://api.douban.com/v2/movie/subject/' + doubanId,
	    		type: 'get',
	    		dataType: 'jsonp',
	    		crossDomain: true,
	    		jsonp: 'callback',
	    		success: function(data) {
		          $('#inputTitle').val(data.title);
		          $('#inputDoctor').val(data.directors[0].name);
		          $('#inputCountry').val(data.countries[0]);
		          $('#inputPoster').val(data.images.large);
		          $('#inputYear').val(data.year);
		          $('#inputSource').val(data.rating.average);
		          $('#inputSummary').val(data.summary);
		          var casts = '';
		          for (var i = 0, len = data.casts.length; i < len; i++) {
		          	casts += data.casts[i].name + '/';
		          }
		          $('#inputCasts').val(casts.substring(0, casts.length - 1));
		          var genres = '';
		          for(var i = 0, len = data.genres.length; i < len; i++) {
		          	genres += data.genres[i] + ',';
		          }
		          $('#inputGenres').val(genres.substring(0, genres.length - 1));
		          $('#inputPv').val(data.ratings_count);
		          $('#inputAka').val(data.aka[0]);
		          var score;
		          score = parseFloat(data.rating.average);
		          score = Math.ceil(score) * 10;
		          score = parseInt(score) /2 ;
		          $('#inputStarScore').val(score);
	    		}
	    	});
    	}
    });
});

  // 注销登录
function logout() {
	$.get('/logout', function(result) {
	  if(result.flag === true || result.flag === 'true') {
	    window.location.reload();
	  }
	});
}

// 删除用户
function deleteUser() {
	var userId = arguments[0];
	$.get('/deleteUser', {
		userId : userId
	}, function(result) {
		if(result.flag === true || result.flag === 'true') {
			refresh();
		} else {
			alert('删除失败');
		}
	});
}

// 刷新页面
function refresh() {
	window.location.reload();
}

// 获取当前分类下所有的电影
function getMoreMovies() {
	var cid = arguments[0];
	window.location.href = "search?cid="
				+ cid + "&q=" + 0;
}