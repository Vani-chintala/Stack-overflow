
const usersReducer = (states=[],action) => {
    switch(action.type){
    case "FETCH_ALLUSERS":
      return action.payload;
      case "UPDATE_CURRENT_USER":
        return states.map((state)=> state._id === action.payload._id ? action.payload : state)
        //if we return action.payload it returns everything so we are mapping only that particular user to update by checking id
    default :
      return states;
    }
} 

export default usersReducer