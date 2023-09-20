
import { useParams, Link } from "react-router-dom"
import upvote from "../../assets/sort-up.svg"
import downvote from "../../assets/sort-down.svg"
import "./QuestionDetails.css"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/question"
import moment from "moment"
import copy from "copy-to-clipboard"

const QuestionDetails = () => {

    const { id } = useParams()
    console.log(id)
    //getting data from backend,store to front end
    const questionsList = useSelector(state => state.questionsReducer)
    console.log(questionsList)
    const [answer, setAnswer] = useState("")
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    //console.log(location)
    const url = 'https://localhost:3000'

    // var questionsList = [{
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is an array?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "javascript", "node js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "nov 25",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "Kiran",
    //         answeredOn: "nov 27",
    //         userId: 2
    //     }]
    // },
    // {
    //     _id: '2',
    //     upVotes: 8,
    //     downVotes: 4,
    //     noOfAnswers: 4,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["react js", "javascript", "node js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "dec 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "kiran",
    //         answeredOn: "dec 14",
    //         userId: 2
    //     }]
    // },
    // {
    //     _id: '3',
    //     upVotes: 5,
    //     downVotes: 1,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a database?",
    //     questionBody: "It meant to be",
    //     questionTags: ["mysql", "mongodb", "sql"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "march 9",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "kiran",
    //         answeredOn: "mar 11",
    //         userId: 2
    //     }]
    // },
    // {
    //     _id: '4',
    //     upVotes: 5,
    //     downVotes: 4,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a promise?",
    //     questionBody: "It meant to be",
    //     questionTags: ["python", "javascript", "node js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "july 6",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "kiran",
    //         answeredOn: "july 12",
    //         userId: 2
    //     }]
    // }
    // ]

    const handlePostAnswer = (e, answerLength) => { //answerLength= ques.answer.length
        e.preventDefault()
        if (User === null) {
            alert("Login or SignUp to answer a question")
            navigate('/Auth')
        } else {
            if (answer === "") {
                alert("Enter an answer before submission")
            } else {
                dispatch(postAnswer({
                    id, noOfAnswers: answerLength + 1, answerBody: answer,
                    userAnswered: User.result.name,
                    userId: User?.result._id 
                }))
            }
        }
    }

    const handleShare = () => {
        copy(url + location.pathname)
        alert("Copied url : " + url + location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upvote', User?.result?._id)) //id is questions id
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downvote', User?.result?._id))  //id is questions id
    }


    return (
        <div className="question-details-page">
            {
                questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questionsList.data.filter(ques => ques._id === id).map(ques =>
                                //console.log(ques)
                                <div key={ques._id}>
                                    <section className="question-details-container">
                                        <h1>{ques.questionTitle}</h1>
                                        <div className="question-details-container-2">
                                            <div className="question-votes">
                                                <img src={upvote} alt="" width="18" className="votes-icon"
                                                    onClick={handleUpVote} />
                                                <p>{ques.upVote.length - ques.downVote.length}</p>
                                                <img src={downvote} alt="" width="18" className="votes-icon"
                                                    onClick={handleDownVote} />
                                            </div>
                                            <div style={{ width: "100%" }}>
                                                <p className="question-body">{ques.questionBody}</p>
                                                <div className="question-details-tags">
                                                    {
                                                        ques.questionTags.map((tag) =>
                                                            <p key={tag}>{tag}</p>)
                                                    }
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type="button" onClick={handleShare}>Share</button>
                                                        {/* //User who has logged in can only delete the question
                                                        that means login id should match with question user id */}
                                                        {
                                                            User?.result?._id === ques?.userId && (
                                                                <button type="button" onClick={handleDelete}>Delete</button>
                                                            )
                                                        }

                                                    </div>
                                                    <div>
                                                        <p>asked {moment(ques.askedOn).fromNow()}</p>
                                                        <Link to={`/Users/${ques.userId}`} className="user-link"
                                                            style={{ color: "#0086d8" }}>
                                                            <Avatar backgroundColor="orange"
                                                                px="8px" py="5px"
                                                                borderRadius="4px">
                                                                {ques.userPosted.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <div>{ques.userPosted} </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        ques.noOfAnswers !== 0 && (
                                            <section>
                                                <h3>{ques.noOfAnswers} Answers</h3>
                                                <DisplayAnswer key={ques._id} question={ques} />
                                            </section>
                                        )
                                    }
                                    <section className="post-ans-container">
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => handlePostAnswer(e, ques.answer.length)}>
                                            <textarea name="" cols="30" rows="10" id=""
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}>
                                            </textarea><br />
                                            <input type="submit" className="post-ans-btn"
                                                value="Post Your Answer" />
                                        </form>
                                        <p>Browse other Question tagged
                                            {
                                                ques.questionTags.map((tag) => (
                                                    <Link to="/Tags" key={tag}
                                                        className="ans-tags">{" "} {tag}{" "} </Link>
                                                ))
                                            }{" "} or
                                            <Link to="/AskQuestion"
                                                style={{ textDecoration: "none", color: "#009dff" }}>{" "}
                                                ask your own Question.
                                            </Link>
                                        </p>
                                    </section>
                                </div>
                            )
                        }
                    </>
            }
        </div>
    )
}

export default QuestionDetails



