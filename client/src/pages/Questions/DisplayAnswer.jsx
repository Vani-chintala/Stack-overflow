
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar/Avatar"
import moment from "moment"
import copy from "copy-to-clipboard"
import {useLocation,useParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {deleteAnswer} from "../../actions/question"

const DisplayAnswer = ({ question }) => {
         
    
    const location = useLocation()
    const url = "https://cheerful-palmier-8952fe.netlify.app"
    const User= useSelector((state)=> (state.currentUserReducer))
    
    const dispatch= useDispatch()
    const {id} = useParams()

    const handleShare = () => {
        copy(url + location.pathname)
        alert("Copied url : "+ url + location.pathname)
    }

    const handleDelete = (answerId,noOfAnswers) => { //answerId= ans._id
        //console.log(answerId,noOfAnswers)
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1)) //id from params
    }

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {
                                     User?.result?._id === ans?.userId && (
                                        <button type="button" 
                                        onClick={()=>handleDelete(ans._id,
                                            question.noOfAnswers)}>Delete</button>
                                        )                       
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`}
                                    className="user-link"
                                    style={{ color: "#0086d8" }}>
                                    <Avatar backgroundColor="lightgreen"
                                        px="8px" py="5px"
                                        borderRadius="4px">
                                        {ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>{ans.userAnswered}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer

