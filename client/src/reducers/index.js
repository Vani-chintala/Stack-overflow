import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import userotpReducer from "./userotp";
import chatbotReducer from "./chatbot";

export default combineReducers({
    authReducer,currentUserReducer,questionsReducer,usersReducer,userotpReducer,chatbotReducer
})
