const Groups = require('../models/groups.model')

module.exports.getGroups = async (req, res) => {
    const groups = await Groups.find({}).sort({'_id': -1})

    if(groups){
        return res.json({
            status: 'success',
            doc: groups
        })
    }
}

module.exports.getGroupByID = async (req, res) => {
    const { _id } = req.params

    const group = await Groups.findOne({_id})

    if(group){
        return res.json({
            status: 'success',
            doc: group
        })
    }

    return res.json({
        status: 'failed',
    })
}

module.exports.createGroup = (req, res) => {
    const { name } = req.body

    if(!name){
        return res.json({
            status: 'failed',
            message: 'Nhập thiếu tên'
        })
    }

    const group = new Groups(req.body)
    group.save()

    return res.json({
        status: 'success',
        doc: group
    })
}

module.exports.updateGroupByID = async (req, res) => {
    const { _id } = req.params
    const { postID } = req.body
    
    const group = await Groups.findOne({_id})
    if(group){
        group.posts.push(postID)
        group.save()

        return res.json({
            status: 'success',
            doc: group
        })
    }

    return res.json({
        status: 'failed'
    })
}