const users = require("../models/user.model")

const getUsers = async (req,res)=>{
          try {
               
                const loggedInUserId = req.user._id

                const allUsers = await users.find({_id:{$ne : loggedInUserId}}).select("-password")

                res.status(200).json(allUsers)

          } catch (error) {
            console.log("Error in getUser", error.message)
            res.status(500).json({error:"Internal server error"})
          }
}


module.exports=getUsers;