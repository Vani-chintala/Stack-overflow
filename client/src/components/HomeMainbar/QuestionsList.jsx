
import CompQuestions from "./CompQuestions"
const QuestionsList =({questionsList}) => {
    //{questionsList} or props.questionsList is same
    return(
        <>
        {
            questionsList.map((quest,index)=>(
                <CompQuestions question={quest} key={quest._id}/>
                ))
        }
        </>
    )
}

export default QuestionsList