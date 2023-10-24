
import Questions from "../models/questions.js"
import mongoose from "mongoose"


export const postAnswer = async (req, res) => {
  //req,res from ,to frontend
  const { id: _id } = req.params
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...")
  }
  updateNoOfQuestions(_id, noOfAnswers)
  try {
    const updatedQuestion = await
      Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
    res.status(200).json(updatedQuestion)
  } catch (error) {
    res.status(400).json("error in updating")
  }
}
//diff between $set and $addToSet is set replaces the complete thing whereas replaces paricular portion only

//to get noOfAnswers 
const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswers } })
  } catch (error) {
    console.log(error)
  }
}

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params
  const { answerId, noOfAnswers } = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...")
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...")
  }
  //after deleting updating no of questions and no of answers
  updateNoOfQuestions(_id, noOfAnswers)
  try {
    //deleting some portion is nothing but updating
    await Questions.updateOne(
      { _id },
      { $pull: { 'answer': { _id: answerId } } }
      //pull is used to pull specific id from this answer(array)
    )
    res.status(200).json({ message: "successfully deleted" })
  } catch (error) {
    res.status(405).json(error)
  }
}
