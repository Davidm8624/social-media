const UserModel = require("../models/UserModel");

const FollowerModel = require('../models/FollowerModel')

const getUserAuth = async (req,res) => {
  const {userId} = req
  if(!userId) return res.status(500).send('no user found')

  try{
    const user = await UserModel.findById(userId)
    const followStats = await FollowerModel.findOne({user: userId})
    return res.status(200).json({user,followStats})
  }catch(err){
    console.log(err);
    return res.status(500).send('server error in getUserAuth')
  }
}

module.exports = {getUserAuth}