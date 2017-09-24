var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false,
	musictDuration: 0
};

window.onload = function() {
	var content = document.getElementById("music-content");
	startDrag(content);
}

//获取相关CSS属性
function getCss(o, key) {
	return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};

//拖拽的实现
var startDrag = function(target) {
	// 首先获取目标元素的left、top属性值
	if (getCss(target, "left") !== "auto") {
		params.left = getCss(target, "left");
	}
		if (getCss(target, "top") !== "auto") {
		params.top = getCss(target, "top");
	}

	target.onmousedown = function(event) {

	// 当鼠标按下时表示元素可以移动，将标记设为true;
	params.flag = true;

	if (event.preventDefault) {
		event.preventDefault();
	}else {
		event.returnValue = false;
	}

	var e = event;
	params.currentX = e.clientX;
	params.currentY = e.clientY;
	};

	target.onmouseup = function() {
		// 当鼠标松开时将标记设为false，表示不可移动
		params.flag = false;
		// 当鼠标松开时再次更新元素的位置
		if (getCss(target, "left") !== "auto") {
			params.left = getCss(target, "left");
		}
		if (getCss(target, "top") !== "auto") {
			params.top = getCss(target, "top");
		}
	};

	target.onmousemove = function(event) {
		var e = event ? event : window.event;
		// 获取到当前鼠标的位置
		if (params.flag) {	
			var nowX = e.clientX,
				nowY = e.clientY;
			var disX = nowX - params.currentX,
				disY = nowY - params.currentY;
			// 将元素的位置更新，parsenInt为了将属性值变为数字类型
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";
			}
		}
	};

$(function() {
	var starScores = $('#interest_sectl .bigstar');
	var ratingstars = $('#interest_sectl .bigstar .starScore').text();
	$(starScores).addClass('bigstar' + ratingstars);

	$('.comment').click(function(e){
        var target = $(this);
        var cid = target.data('cid');
        var tid = target.data('tid');
        var cname = target.data('cname');
        if($('#tid').length === 0) {
          $('<input>').attr({
            type : 'hidden',
            id : 'tid',
            name : 'musicComment[tid]',
            value : tid
          }).appendTo('#commentForm');
        } else {
          $('#tid').val(tid);
        }

        if($('#cid').length === 0) {
          $('<input>').attr({
            type : 'hidden',
            id : 'cid',
            name : 'musicComment[cid]',
            value : cid
          }).appendTo('#commentForm');
        } else {
          $('#cid').val(cid);
        }
        $('.commentArea').attr('placeholder','回复 ' + cname);

      });

      // 播放音乐状态
	$('.play-music').click(function() {
      	var classNames = $(".play-music").attr("class");
      	classNames = classNames.split(' ');
      	var len = classNames.length;
      	var index = 0;
     	for(var i = 0; i < len; i++) {
     		index = $.inArray("play", classNames); 
     	}
     	if(index === -1) {
     		$(this).removeClass('pause');
     		$(this).addClass('play');

     		$('.animate').addClass('rotation');
     		$('#player').jPlayer('play');
     	} else {
     		$(this).removeClass('play');
     		$(this).addClass('pause');

     		$('.animate').removeClass('rotation');
     		$('#player').jPlayer('pause');
     	}
	});


      // 播放音乐
	$('#player').jPlayer({
		supplied: 'mp3',
		wmode: 'window',
		preload: 'metadata', 
		ready: function () {
			var musicAddress = $('#music-address').val();
			$(this).jPlayer("setMedia", { 
				mp3: musicAddress     
			}).jPlayer("play"); 
		},
		ended: function (event) {                          
			$(this).jPlayer("play");
		},
		volume: 0.4
	});

	// 绑定音乐播放的一些事件
	$('#player').bind($.jPlayer.event.timeupdate, function(e) {
		params.musictDuration = e.jPlayer.status.duration;
		$('.left-time').text($.jPlayer.convertTime(parseInt(e.jPlayer.status.currentTime)));
		$('#progress-content .progress').css('width', e.jPlayer.status.currentPercentAbsolute  + '%');
	});
	
	// 音乐进度条点击事件
	$('#progress-content').click(function(e) {
		$('.play-music').removeClass('pause');
		$('.play-music').addClass('play');

		var progressContent = document.getElementById('progress-content');
		var progressWidth = (e.clientX - progressContent.getBoundingClientRect().left) / progressContent.clientWidth;
		$('#progress-content .progress').css('width', progressWidth*100 + '%');
		$('#player').jPlayer('play', params.musictDuration * progressWidth);
	});

	// 音量进度条点击事件
	$('#volume-content').click(function(e) {

		var volumeContent = document.getElementById('volume-content');
		var progressWidth = (e.clientX - volumeContent.getBoundingClientRect().left) / volumeContent.clientWidth;
		$('#volume-content .progress').css('width', progressWidth*100 + '%');
		$('#player').jPlayer('volume', progressWidth);

	});
	
}); 