import * as api from '../api/index'
import { setCurrentUser } from './currentUser'

// as we are using extra thunk we have to use extra =>
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData)
    dispatch({ type: "AUTH", data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData)
    dispatch({ type: "AUTH", data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const forgotpassword = (email, navigate) => async (dispatch) => {
  console.log(email)
  try {
    const { data } = await api.forgotPassword(email)
    console.log(data)
    dispatch({ type: "FORGOT_PASSWORD", data })
    console.log("Forgot password link sent to your email")
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

 
export const resetverification = (id,token) => async(dispatch)=> {
  console.log(id,token)
  try{
    const {data} = await api.resetVerification(id,token)
    
    dispatch({type : "RESET_VERIFY",data})
    console.log("user valid")
  }catch(error){
    console.log("user not valid")
    //document.write(error)
  }
}

export const resetpassword = (password, confirmpassword, id, token, navigate) => async (dispatch) => {

  console.log( password, confirmpassword, id, token )
  try {
    const { data } = await api.resetPassword(password, confirmpassword, id, token)
    console.log(data)
    dispatch({ type: "RESET_PASSWORD", data })
    console.log("successfully reset")
    navigate('/auth')
  } catch (error) {
    console.log("error while resetting password")
  }
}