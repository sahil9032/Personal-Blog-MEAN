const express = require('express');
const postRoute = express.Router();

let Blog = require('../models/blog');

//GET: localhost:4000/post/get
postRoute.route('/get').get((req, res) => {
    Blog.find((error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
})

//GET: localhost:4000/post/get/:id
postRoute.route('/get/:id').get((req, res) => {
    Blog.findById(req.params.id, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
})

//POST: localhost:4000/post/add/post
postRoute.route('/add/post').post((req, res) => {
    Blog.create({
        title: req.body.title,
        author: req.body.author,
        data: req.body.date,
        imagePath: req.body.imagePath,
        content: req.body.content,
        comments: req.body.comments
    }, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
});

//POST: localhost:4000/post/add/comment
postRoute.route('/add/comment').post((req, res) => {
    Blog.updateOne(
        {_id: req.body._id},
        {
            $push: {
                comments: [{
                    author: req.body.author,
                    content: req.body.content
                }]
            }
        },
        (error, data) => {
            if (error) {
                return res.json({
                    _id: '-1'
                })
            } else {
                res.json(data)
            }
        })
});

//DELETE: localhost:4000/post/delete/:id
postRoute.route('/delete/:id').delete((req, res) => {
    Blog.findOneAndRemove( {_id: req.params.id}, (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            res.json(data)
        }
    })
});

//DELETE: localhost:4000/post/delete/comment/:postid/:commentid
postRoute.route('/delete/comment/:postid/:commentid').delete((req, res) => {
    Blog.updateOne(
        {_id: req.params.postid},
        {
            $pull: {
                comments: {_id: req.params.commentid}
            }
        },
        (error, data) => {
            if (error) {
                return res.json({
                    _id: '-1'
                })
            } else {
                res.json(data)
            }
        })
});

//PUT: localhost:4000/post/update/:id
postRoute.route('/update/:id').put((req, res) => {
    Blog.findOneAndUpdate({_id: req.params.id},
        {
            $set: {
                'title': req.body.title,
                'content': req.body.content
            }
        }
        , (error, data) => {
        if (error) {
            return res.json({
                _id: '-1'
            })
        } else {
            return res.json(data)
        }
    })
})

module.exports = postRoute;
