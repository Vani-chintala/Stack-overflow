
const userotpReducer = (state = (null),action) => {
    switch(action.type){
        case 'SEND_OTP': 
        return {...state,data : action?.data}
        case "VERIFY_OTP" :
            return {...state,data : action?.data}
        default : 
        return state
    }
}

export default userotpReducer