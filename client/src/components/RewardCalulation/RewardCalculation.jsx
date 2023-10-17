
import { useSelector } from "react-redux"

const RewardCalculation = () => {
    const questionsList = useSelector(state => state.questionsReducer)
    
    const User = useSelector((state) => (state.currentUserReducer))
    return(
     <div>
        Rewards and Honours
        const useraskedquestions = 
        {
                questionsList.data.filter((q)=>q.userId === User.result._id)
        }

        const useraskednoofquestions = useraskedquestions.length
        const useransweredquestions = {
            questionsList.data.filter((q)=>q.answer[i].userId === User.result._id)
        }
        const useranswerednoofquestions = useransweredquestions.length
     </div>
    )
}


export default RewardCalculation