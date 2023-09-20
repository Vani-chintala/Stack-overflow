
import "./HomeMainbar.css"

import {useLocation,useNavigate} from "react-router-dom"

import QuestionsList from "./QuestionsList"
import { useSelector } from "react-redux"
const HomeMainbar=()=>{

const location = useLocation()
const user = 2
const navigate= useNavigate()

//getting data from backend,store to front end
const questionsList = useSelector(state => state.questionsReducer)
console.log(questionsList)

//     var questionsList= [{
//         _id:1,
//         upVotes:3,
//         downVotes:2,
//         noOfAnswers:2,
//         questionTitle:"What is an array?",
//         questionBody:"It meant to be",
//         questionTags:["java","javascript","node js"],
//         userPosted:"mano",
//         userId:1,
//         askedOn:"nov 25",
//         answer:[{
//             answerBody:"Answer",
//             userAnswered:"Kiran",
//             answeredOn:"nov 27",
//             userId:2
//         }]
//     },
//     {
//         _id:2,
//         upVotes:8,
//         downVotes:4,
//         noOfAnswers:4,
//         questionTitle:"What is a function?",
//         questionBody:"It meant to be",
//         questionTags:["react js","javascript","node js"],
//         userPosted:"mano",
//         userId:1,
//         askedOn:"dec 1",
//         answer:[{
//             answerBody:"Answer",
//             userAnswered:"kiran",
//             answeredOn:"dec 14",
//             userId:2
//         }]
//     },
//     {
//         _id:3,
//         upVotes:5,
//         downVotes:1,
//         noOfAnswers:2,
//         questionTitle:"What is a database?",
//         questionBody:"It meant to be",
//         questionTags:["mysql","mongodb","sql"],
//         userPosted:"mano",
//         userId:1,
//         askedOn:"march 9", 
//         answer:[{
//             answerBody:"Answer",
//             userAnswered:"kiran",
//             answeredOn:"mar 11",
//             userId:2
//         }]
//     },
//     {
//         _id:4,
//         upVotes:5,
//         downVotes:4,
//         noOfAnswers:2,
//         questionTitle:"What is a promise?",
//         questionBody:"It meant to be",
//         questionTags:["python","javascript","node js"],
//         userPosted:"mano",
//         userId:1,
//         askedOn:"july 6",
//         answer:[{
//             answerBody:"Answer",
//             userAnswered:"kiran",
//             answeredOn:"july 12",
//             userId:2
//         }]
//     }
// ]


const checkAuth=()=>{
    if(user===null){
        alert("log in or signup to ask a question")
        navigate('/Auth')
    }else{
        navigate('/AskQuestion')
    }
}
    return(
        <div className="main-bar">
            <div className="main-bar-header">
                {
                  location.pathname === "/" ? 
                  <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button  className="ask-btn" 
                onClick={checkAuth}>Ask Question</button>
            </div>
            <div>
                {
                    questionsList.data === null ? <h1>Loading....</h1>:
                    <>
                    <p>{questionsList.data.length} questions</p>
                 <QuestionsList questionsList={questionsList.data}/>
                    </> 
                }
            </div>
        </div>
    )
}

export default HomeMainbar