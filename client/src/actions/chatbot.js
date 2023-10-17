
import * as api from "../api/index"


export const javascriptchat = (text) => async(dispatch) => {
    
    try{
    const {data} = await api.javascriptChat(text)
    dispatch({type : "JAVASCRIPTCHAT", data})
   // setResponse(data)
    //setdisplayText(false)
    console.log(data)
    console.log("Successfully answered")
    }catch(error){ 
        console.log(error)
    }
}