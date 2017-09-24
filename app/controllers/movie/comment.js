var comment = require('../../models/movie/comment');

// 添加评论
exports.addNewComment = function(req, res) {
    var commentInfo = req.body.comment;
    var movieId = commentInfo.movie;

    if(commentInfo.cid) { // 若评论已存在

        comment.findById(commentInfo.cid, function(err, comment) {
            var reply = {
                from : commentInfo.from,
                to : commentInfo.content.tid,
                content : commentInfo.content
            };


        comment.reply.push(reply);

        comment.save(function(err, comment) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/movie/' + movieId);
            }
            });
        });
    } else {
        var _comment = new comment(commentInfo);
        _comment.save(function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/movie/' + movieId);
       }
     });
   }
}
