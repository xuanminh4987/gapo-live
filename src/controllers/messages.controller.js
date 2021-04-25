const Messages = require('../models/messages.model')

module.exports.getMessages = async (req, res) => {
    const messages = await Messages.find({})

    if(messages){
        return res.json({
            status: "success",
            doc: messages
        })
    }
}

module.exports.getMessageByID = async (req, res) => {
    const { _id } = req.params

    const message = await Messages.findOne({_id})

    if(message){
        return res.json({
            status: 'success',
            doc: message
        })
    }

    return res.json({
        status: 'failed',
    })
}

module.exports.setMessage = async (req, res) => {
    const { userID_1, userID_2, message } = req.body

    if(!userID_1 || !userID_2){
        return res.json({
            status: 'failed'
        })
    }

    if(message){
        const newMessage = new Messages({
            userID_1,
            userID_2,
            messages: [{
                sender: userID_1,
                message
            }]
        })
    
        newMessage.save()
        return res.json({
            status: 'success',
            doc: newMessage
        })
    }

    const messages = (await Messages.findOne({$and: [{userID_1}, {userID_2}]})) ? (await Messages.findOne({$and: [{userID_1}, {userID_2}]}))
    : (await Messages.findOne({$and: [{userID_1: userID_2}, {userID_2: userID_1}]})) ? (await Messages.findOne({$and: [{userID_1: userID_2}, {userID_2: userID_1}]})) : ''

    if(messages){
        return res.json({
            status: 'success',
            doc: messages
        })
    }

    return res.json({
        status: 'failed'
    })
}

module.exports.updateMessageByID = async (req, res) => {
    const { _id } = req.params
    const {...messageInfo} = req.body

    const messages = await Messages.findOne({_id})
    if(messages){
        messages.messages.push(messageInfo)
        messages.save()

        return res.json({
            status: 'success',
            doc: messages
        })
    }

    return res.json({
        status: 'failed'
    })
}