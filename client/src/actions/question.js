
import * as api from "../api/index"


export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    // {data} from backend
    const { data } = await api.postQuestion(questionData)
    dispatch({ type: "POST_QUESTION", payload: data })
    //when we fetch all questions we are not geteting questions inQuestiondetailspage to solve this,
    dispatch(fetchallQuestions())
    navigate("/")
  } catch (error) {
    console.log(error)
  }
}


export const fetchallQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getQuestionsAll()
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data })
  } catch (err) {
    console.log(err)
  }
}

//we will get id,navigate from questiondetails page
export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    await api.deletingQuestion(id)
    dispatch(fetchallQuestions())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => { //value may be upvote or downvote,id is questionsid
  try {
    await api.votingQuestion(id, value, userId)
    dispatch(fetchallQuestions())
  } catch (error) {
    console.log(error)
  }
}


export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, noOfAnswers, answerBody, userAnswered, userId } = answerData
    const { data } = await api.placeAnswer(id, noOfAnswers, answerBody, userAnswered, userId)
    dispatch({ type: "POST_ANSWER", payload: data })
    dispatch(fetchallQuestions())
  } catch (error) {
    console.log(error)
  }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    await api.deletingAnswer(id, answerId, noOfAnswers)
    dispatch(fetchallQuestions())
  } catch (error) {
    console.log(error)
  }
}

