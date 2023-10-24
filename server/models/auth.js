
import mongoose from "mongoose"

const userSchema= mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
     tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    token:{type: String},
    points : {type : Number},
    QuestionsAsked :{type: Number},
    AnswersAnswered : {type: Number}
})

export default mongoose.model("Users",userSchema)