
import mongoose from "mongoose"
import Users from "../models/auth.js"

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find() //Users is model (collection)
    const allUserDetails = []
    allUsers.forEach(useritem => {
      allUserDetails.push({
        _id: useritem._id, name: useritem.name,
        about: useritem.about, tags: useritem.tags, joinedOn: useritem.joinedOn
      })
    })
    res.status(200).json(allUserDetails)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params
  const { name, about, tags } = req.body
  //checking id is valid or not
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Profile unavailable")
  }
  try {
    const updatedProfile = await
      Users.findByIdAndUpdate(_id, {
        $set: {
          "name": name,
          "about": about, "tags": tags
        }
      }, { new: true })
    //if we mention new:true database returns updated record orelse returns previous record(it updates in db but don't return updated one)
    res.status(200).json(updatedProfile)
  } catch (error) {
    res.status(405).json({ message: error.message })
  }
}


