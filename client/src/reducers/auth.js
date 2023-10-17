
const authReducer = (state = (null), action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('Profile', JSON.stringify({ ...action?.data }))
            return { ...state, data: action?.data }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, data: null }
        case 'FORGOT_PASSWORD':
            return { ...state, data: action?.data }
        //  case 'RESET_VERIFY':
        //      return { ...state, data: action?.data }
        case 'RESET_PASSWORD':
            return { ...state, data: action?.data }
        default:
            return state;
    }
}

export default authReducer