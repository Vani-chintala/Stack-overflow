
import Questions from "../models/questions.js"
import mongoose from "mongoose"

export const askQuestion = async (req, res) => {
   const postQuestionData = req.body
   const postQuestion = new Questions(postQuestionData) //Questions= model
   try {
      await postQuestion.save()
      res.status(200).json("Posted a question successfully")
   } catch (err) {
      console.log(err)
      res.status(409).json("Couldn't post a new Question")
   }
}

export const getAllQuestions = async (req, res) => {
   try {
      const questionsall = await Questions.find() //Questions =>is schema or database
      res.status(200).json(questionsall)
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const deleteQuestion = async (req, res) => {
   const { id: _id } = req.params
   //checking mongo id is vaild or not
   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Question unavailable")
   }
   try {
      await Questions.findByIdAndRemove(_id)
      res.status(200).json({ message: "successfully deleted ...." })
   } catch (error) {
      res.status(404).json({ message: error.message })
   }
}

export const voteQuestion = async (req, res) => {
   const { id: _id } = req.params
   const { value, userId } = req.body //value == upvote or downvote
   //checking mongo id is vaild or not
   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Question unavailable")
   }
   try {
      const question = await Questions.findById(_id) //Question is an obj 
      const upIndex = await question.upVote.findIndex((id) => id === String(userId))
      const downIndex = await question.downVote.findIndex((id) => id === String(userId))
      //user can only provide upvote or downvote
      //e.g : 0 =>upvote=1,=>downvote=-1
      //checking conditions
      //1.user has already downvoted
      //2.user is new user
      //3.user has already upvoted
      if (value === "upvote") {     //value=upvote means user has choosen upvote
         if (downIndex !== -1) {
            question.downVote = question.downVote.filter((id) => id !== String(userId))
         }
         if (upIndex === -1) {
            question.upVote.push(userId)
         }
         else {
            question.upVote = question.upVote.filter((id) => id !== String(userId))
         }
      }
      //checking conditions
      //1.user has already upvoted
      //2.user is new user
      //3.user has already downvoted
      else if(value === "downvote"){
         if (upIndex !== -1) {
            question.upVote = question.upVote.filter((id) => id !== String(userId))
         }
         if (downIndex === -1) {
            question.downVote.push(userId)
         }
         else {
            question.downVote = question.downVote.filter((id) => id !== String(userId))
         }
      }
        await Questions.findByIdAndUpdate(_id, question )
        res.status(200).json({message : "voted successfully"})
   } catch (error) {
         res.status(404).json({message : "id not found"})
   }
}
