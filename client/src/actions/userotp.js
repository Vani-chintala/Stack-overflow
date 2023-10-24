
import * as api from "../api/index"


export const sendotp = (email) => async (dispatch) => {

    try {
        const { data } = await api.sendOtp(email)
        dispatch({ type: "SEND_OTP", data })
        console.log("OTP successfully sent to your email")
    } catch (error) {
        console.log(error)
    }
}

export const verifyotp = (otpvariable, navigate) => async (dispatch) => {
    
    try {
        const { data } = await api.verifyOtp(otpvariable)
        dispatch({ type: "VERIFY_OTP", data })
        console.log("otp verification is success")
        navigate(`/chatbot/main/${otpvariable}`)
    } catch (error) {
        console.log("otp verification failed")
    }
}