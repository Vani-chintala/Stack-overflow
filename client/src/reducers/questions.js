
const questionsReducer = (state={data:null},action) =>{
    switch(action.type){
     case "POST_QUESTION":
        return {...state} //here we don't need data: action.payload(action.payload data is controllers/questions =>res.json
     case "POST_ANSWER":
        return {...state}
        case "FETCH_ALL_QUESTIONS":
        return {...state,data: action.payload}   
     default:
        return state
    }
}

export default questionsReducer