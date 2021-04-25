const Users = require('../models/users.model')

module.exports.getUsers = async (req, res) => {
    const users = await Users.find({})

    if(users){
        return res.json({status: 'success', doc: users})
    }

    return res.json({status: 'failed', messagge: 'Không tồn tại.'})
}

module.exports.getUserByID = async (req, res) => {
    const {_id} = req.params

    const user = await Users.findOne({_id})
    if(user){
        return res.json({status: 'success', doc: user})
    }

    return res.json({status: 'failed'})
}

module.exports.handleUser = async (req, res) => {
    const {type, userInfo} = req.body

    if(!userInfo.email){
        return res.json({
            status: 'failed',
            message: 'Nhập thiếu thông tin cần thiết.'
        })
    }

    const user = await Users.findOne({email: userInfo.email})

    if(type === "login"){
        if(!userInfo.password){
            return res.json({
                status: 'failed',
                message: 'Nhập thiếu thông tin cần thiết.'
            })
        }

        if(user){
            if(user.password === userInfo.password){
                return res.json({
                    status: 'success',
                    doc: user
                })
            }

            return res.json({
                status: 'failed',
                message: 'Mật khẩu không đúng.'
            })
        }

        return res.json({
            status: 'failed',
            message: 'Email không tồn tại.'
        })
    }

    if(type === 'signup'){
        const {firstName, lastName, email, password, birthday, gender, avatar} = userInfo

        if(!firstName || !lastName || !email || !password || !birthday || !gender){
            return res.json({
                status: 'failed', 
                message: 'Nhập thiếu thông tin cần thiết.'
            })
        }

        if(user){
            return res.json({
                status: 'failed',
                message: 'Email đã tồn tại.'
            })
        }

        const newUser = new Users(userInfo)
        newUser.save((err, user) => {
            if(err) throw err

            return res.status(200).json({
                status: 'success',
                doc: user
            })
        })
    }
}

module.exports.updateUserByID = async (req, res) => {
    const { _id } = req.params
    const { type, data } = req.body

    let user = await Users.findOne({_id})
    if(user){
        if(type === 'friends'){
            user.friends.map(friendsInfo => {                
                if(friendsInfo._id === data._id){
                    user.friends.pull(friendsInfo)
                    user.save()
                }
            })

            if(data.status != false){
                user.friends.push(data)
                user.save()
            }

            return res.json({
                status: 'success',
                doc: user
            })
        }
    }

    return res.json({
        status: 'failed',
    })
}