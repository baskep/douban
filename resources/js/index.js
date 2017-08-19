 window.onload = function() {
    // 初始化电影分类数据
    var inputEle = $('.tag-list input')[0];
    $(inputEle).parent().addClass('activate');
    var item = $(inputEle).val();

    getDataOfCategory(item); // 获取当前分类下的电影数据

    // 正在热映
    var starScores = $('.starScore');
    var ratingstars = $('.star');
    for(var i = 0, len = starScores.length; i < len; i++) {
        $(ratingstars[i]).addClass('allstar' + $(starScores[i]).text());
    }

    // 电影分类选项栏点击事件
    $('.tag-list input').click(function() {
        $('.tag-list label').removeClass('activate');
        $(this).parent().addClass('activate')
        var item = $(this).val();
        getDataOfCategory(item);
    });
        
    // 最新上映
    var orders = $('.order');
    for(var i = 0, len = orders.length; i < len; i ++) {
        $(orders[i]).text(i + 1);
    }

    // 正在热映向右翻页
    var slideCount = parseInt($.trim($('.ui-slide-max').text()));
    $('.ui-slide-control .next-btn').click(function() {
        var index = parseInt($.trim($('.ui-slide-index').text()));
        var moveInstance;
        if(index < slideCount) {
            moveInstance = transformNum(index) * 590;
            $('.ui-slide-index').text(index + 1);
            $('.ui-slide-content').css('left', moveInstance + 'px');
        } else {
            $('.ui-slide-index').text(1);
            $('.ui-slide-content').css('left', '0');
        }
    });

     // 正在热映向左翻页
    $('.ui-slide-control .prev-btn').click(function() {
      var index = parseInt($.trim($('.ui-slide-index').text()));
      var moveInstance;
      if(index === 1) {
        moveInstance = transformNum(slideCount-1) * 590;
        $('.ui-slide-index').text(slideCount);
        $('.ui-slide-content').css('left', moveInstance + 'px');
      } else {
          moveInstance = transformNum(index-2) * 590;
          $('.ui-slide-index').text(index-1);
          $('.ui-slide-content').css('left', moveInstance + 'px');
      }
    });
}

// 注销登录
function logout() {
    $.get('/logout', function(result) {
        if(result.flag === true || result.flag === 'true') {
            window.location.reload();
        }
    });
}

// 获取当前分类的数据
function getDataOfCategory(item) {
    $('.slide-wrapper').html('');
    $('#slide-ctrl').html('');
    $('.slide-wrapper').css({
      'transition': 'left 0s',
      'left': '0'
    });
    $.get('/getDataOfCategory', {
        categoryName: item
    }, function(result) {
        var len = result.movies.length;
        if(len > 0) {
            loadCategoryMovieData(len, result);
            var slideCount = Math.ceil(len/8);
            setCarousel(slideCount);
        }
    });
}

  //加载不同分类下的数据
function loadCategoryMovieData(len, result) {
    var slidePageEle = '<div class="slide-page" style="width: 608px;">';
    for(var i = 0; i < len; i++) {
        if(i % 8 ===0 && i > 0) {
            slidePageEle = '';
            slidePageEle += '<div class="slide-page" style="width: 608px;">';
        }
        slidePageEle += '<a class="item" target="_blank" href="/movie/' + result.movies[i]._id + '" >' +
                            '<div class="cover-wp">' +
                                '<img src="' + result.movies[i].poster + '" alt="' + result.movies[i].title + '" style="width:140px;height:203px;">' +
                            '</div>' +
                        '<p>' + result.movies[i].title +
                            '<strong>&nbsp;' + result.movies[i].score +
                            '</strong>' +
                        '</p>'
                      '</a>'
        if((i+1) % 8 ===0 || (i+1) === len) {
            slidePageEle += '</div>' ;
            $('.slide-wrapper').append(slidePageEle);
        }
    }
}

// 设置图片轮播效果
function setCarousel(slideCount) {
    $('.slide-wrapper').css('transition', 'left 0.5s');
    if(slideCount > 0) {
        var slideEle = '<a class="btn-prev" href="javascript:void(0)"></a>' +
                        '<i class="dot activate" data-index="0"></i>';

        for(var i = 1; i < slideCount; i ++) {
            slideEle += '<i class="dot"' + 'data-index="' + i +'"></i>';
        }
        slideEle += '<a class="btn-next" href="javascript:void(0)"></a>';

        $('#slide-ctrl').append(slideEle);

        $('#slide-ctrl .dot').click(function() {
            $('#slide-ctrl .dot').removeClass('activate');
            $(this).addClass('activate');
            var moveInstance = transformNum(parseInt($(this).attr('data-index'))) * 608;
            $('.slide-wrapper').css('left', moveInstance + 'px');
        });

    // 点击向后翻页
    $('#slide-ctrl .btn-next').click(function() {
        var parts = $('#slide-ctrl i');
        var partsLen = parts.length,
            moveInstance,
            currentPart;
        if(partsLen > 1) {
            currentPart = $('i.activate');
            var data_index = parseInt($(currentPart).attr('data-index'));
            if(data_index === partsLen-1) {
                moveInstance = 0; 
                $(currentPart).removeClass('activate');
                $(parts[0]).addClass('activate');
            } else {
                moveInstance = transformNum(data_index + 1) * 608;
                $(currentPart).removeClass('activate');
                $(parts[data_index + 1]).addClass('activate');
            }
            $('.slide-wrapper').css('left', moveInstance + 'px');
        }
    });

    // 点击向前翻页
    $('#slide-ctrl .btn-prev').click(function() {
        var parts = $('#slide-ctrl i');
        var partsLen = parts.length,
            moveInstance,
            currentPart;
        if(partsLen > 1) {
          currentPart = $('i.activate');
          var data_index = parseInt($(currentPart).attr('data-index'));
          if(data_index === 0) {
            moveInstance = transformNum(partsLen-1) * 608; 
            $(currentPart).removeClass('activate');
            $(parts[partsLen-1]).addClass('activate');
          } else {
            moveInstance = transformNum(data_index - 1) * 608;
            $(currentPart).removeClass('activate');
            $(parts[data_index - 1]).addClass('activate');
          }
          $('.slide-wrapper').css('left', moveInstance + 'px');
        }
      });
    }  
  }

// 将正数转为负数
function transformNum(number){
    if(number === 0) {
        return 0;
    } else {
        return parseInt('-' + number);
    }
}