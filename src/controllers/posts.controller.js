const Posts = require('../models/posts.model')

module.exports.getPosts = async (req, res) => {
    const posts = await Posts.find({}).sort({'_id': -1})

    if(posts){
        return res.json({
            status: 'success',
            doc: posts
        })
    }
}

module.exports.getPostByID = async (req, res) => {
    const { _id } = req.params

    const post = await Posts.findOne({_id})
    if(post){
        return res.json({
            status: 'success',
            doc: post
        })
    }

    return res.json({
        status: 'failed'
    })
}

module.exports.createPost = (req, res) => {
    const { userID, content } = req.body

    if(!userID || !content){
        return res.json({
            status: 'failed',
            message: 'Thiếu thông tin cần thiết.'
        })
    }

    const newPost = new Posts(req.body)
    newPost.save()

    return res.json({
        status: 'success',
        doc: newPost
    })
}

module.exports.updatePostByID = async (req, res) => {
    const { type, data } = req.body
    const { _id } = req.params

    console.log(data);

    const post = await Posts.findOne({_id})
    if(post){
        if(type === 'reaction'){
            post.reaction.like.pull(data.userID)
            post.reaction.love.pull(data.userID)
            post.reaction.haha.pull(data.userID)
            post.reaction.wow.pull(data.userID)
            post.reaction.sad.pull(data.userID)
            post.reaction.angry.pull(data.userID)

            if(data.status){
                post.reaction[data.type].push(data.userID)
            }

            post.save()
        }

        if(type === 'comment'){
            post.comments.push(data)
            post.save()
        }

        return res.json({
            status: 'success',
            doc: post
        })
    }

    return res.json({
        status: 'failed'
    })
}