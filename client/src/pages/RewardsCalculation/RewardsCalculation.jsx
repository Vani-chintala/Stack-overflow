
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "./RewardsCalculation.css"
import {  useState } from "react"




const RewardCalculation = () => {

    const [points1, setPoints1] = useState("")
    const [points2, setPoints2] = useState("")
    

    const { id } = useParams()
    console.warn(id)

    const User = useSelector((state) => (state.currentUserReducer))
    console.warn(User)

    const questionsList = useSelector(state => state.questionsReducer)
    console.warn(questionsList)
    
    

    // calculating user asked questions
    const useraskedquestions = questionsList.data.filter(q => q.userId === id)
    const useraskednoofquestions = useraskedquestions.length
    console.warn(useraskednoofquestions)
    //calculating user answered questions
    const Gettinganswer = questionsList.data.filter(ans => ans.userId === User.result?._id)
    const NoofAnswersAnswered = (Gettinganswer.length) + 1
    console.warn(NoofAnswersAnswered)
    //calculating user asked question upvotes
    const NoofUpvotesforAQue = questionsList.data.filter(q => q.userId === id)
    const NoofUpvotesforAQuestion = NoofUpvotesforAQue.map(q=> q.upVote.length)
    console.warn(NoofUpvotesforAQuestion)




    const handleupvotepoints = () => {
        if (NoofUpvotesforAQuestion < 5) {
            alert("User gets 0 extra points")
        } else if (NoofUpvotesforAQuestion >= 5 ) {
            alert("User gets 10 points")
            setPoints1(10)
        }
        else if (NoofUpvotesforAQuestion >= 10) {
            alert("User gets 20 extra points")
            setPoints1(20)
        }
    }

    const handleanswerpoints = () => {
        if (NoofAnswersAnswered < 5) {
            alert("User will get points if answered 5 questions")
            setPoints2(0)
        } else if (NoofAnswersAnswered === 5) {
            alert("User gets 10 points and Honor Badge")
            setPoints2(10)
        } else {
            alert("User gets 20 points and Honor Badge")
            setPoints2(20)
        }
    }



    
    const totalpoints = (points1 + points2)
    console.log(totalpoints)


   
    return (
        <div className="rewardscalc-container1">

            <div className="rewardsname">
                <b>{User?.result.name}</b>
            </div>
            <div className="rewardsquestions">
                NoofQuestionsAsked = {useraskednoofquestions} questions
            </div>
            <div className="rewardsupvotes">
                <div onClick={handleupvotepoints} value={points1}>
                    NoofUpvotesforAQuestion = {
                        questionsList.data.filter(q => q.userId === id).map(q => <p>{q.upVote.length} upvotes</p>)
                    }
                </div>
            </div>
            <div className="rewardsanswers">
                <div onClick={handleanswerpoints} value={points2}>
                    NoofAnswersAnswered = {
                        (questionsList.data.filter(ans => ans.userId === User.result?._id)).length + 1
                    } answers
                </div>
            </div>
            {/* <div className="rewardspoints1">
               ({questionsList.data.upVote === 5 || 10} && {questionsList.data.userId === id}) ?
                <p>{User?.result?.name} gets 10 points</p> : 
                <p>No points </p> 
                
                    
                
             </div>
              */}
              
            

        </div>
    )
}

export default RewardCalculation


