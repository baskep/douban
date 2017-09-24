var musicComment = require('../../models/music/musicComment');

// 添加评论
exports.addNewComment = function(req, res) {
    var commentInfo = req.body.musicComment;
    var musicId = commentInfo.music;

    if(commentInfo.cid) { // 若评论已存在

        musicComment.findById(commentInfo.cid, function(err, musicComment) {
            var reply = {
                from : commentInfo.from,
                to : commentInfo.content.tid,
                content : commentInfo.content
            };

        musicComment.reply.push(reply);

        musicComment.save(function(err, musicComment) {
            console.log('comment :' + musicComment);
            if(err) {
                console.log(err);
            } else {
                res.redirect('/music/' + musicId);
            }
            });
        });
    } else {
        var _musicComment = new musicComment(commentInfo);
        _musicComment.save(function(err, comment) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/music/' + musicId);
       }
     });
   }
}
