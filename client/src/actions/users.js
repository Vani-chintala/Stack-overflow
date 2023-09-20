
import * as api  from  "../api/index"

 export const fetchAllUsers = () => async(dispatch) => {
    try{
      const {data} = await api.getAllUsers()
      dispatch({type:"FETCH_ALLUSERS",payload:data})
    }catch(error){
        console.log(error)
    }
}

export const updateProfile = (id,updateData) => async(dispatch) => {
  try{
    const {data} = await api.updatingProfile(id,updateData)
    dispatch({type: "UPDATE_CURRENT_USER",payload : data})
  }catch(error){
    console.log(error)
  }
}