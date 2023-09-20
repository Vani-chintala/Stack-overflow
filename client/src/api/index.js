import axios from "axios"
//axios is used to send req to backend
const API= axios.create({baseURL:"http://localhost:5000"})

//we are going to add token in each req(because this is the place we are sending req to backend)
//we are some extra values to the req to make our application more secure
API.interceptors.request.use((req)=>{
   if(localStorage.getItem("Profile")){
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
      //we are sendinng our userstoken for each and every req to the database
   }
   return req
})


export const logIn = (authData) => API.post('/user/login',authData)
export const signUp = (authData) => API.post('/user/signup',authData)

export const postQuestion = (questionData) => API.post('/question/Ask',questionData)
export const getQuestionsAll = () => API.get('/question/get')
export const deletingQuestion =(id) => API.delete(`/question/delete/${id}`) //${id} =questionid
export const votingQuestion =(id,value,userId) => API.patch(`/question/vote/${id}`,{value,userId})

export const  placeAnswer =(id,noOfAnswers,answerBody,userAnswered,userId)=> 
   API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId}) //${id}=answerid
export const deletingAnswer = (id,answerId,noOfAnswers) => 
   API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers})
   
export const getAllUsers = () => API.get('/user/getAllUsers')
export const updatingProfile = (id,updateData) =>API.patch(`/user/update/${id}`,updateData) //${id} = profile id