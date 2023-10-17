
const chatbotReducer = (state = (null),action) => {
    switch(action.type){
        case 'AVASCRIPTCHAT': 
        return {...state,data : action?.data}
        
        default : 
        return state
    }
}

export default chatbotReducer