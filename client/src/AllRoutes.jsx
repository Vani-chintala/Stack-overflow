
import {Routes,Route} from "react-router-dom"
import Auth from "./pages/Auth/Auth"
import Home from "./pages/Home/Home"
import Questions from "./pages/Questions/Questions"
import AskQuestion from "./pages/AskQuestion/AskQuestion"
import DisplayQuestions from "./pages/Questions/DisplayQuestions"
import Tags from "./pages/Tags/Tags"
import Users from "./pages/Users/Users"
import UserProfile from "./pages/UserProfile/UserProfile"
import Forgotpassword from "./pages/Forgotpassword/Forgotpassword"
import Resetpassword from "./pages/Resetpassword/Resetpassword"
import ChatbotHome from "./pages/ChatbotHome/ChatbotHome"
import Chatbotresult from "./pages/Chatbotresult/Chatbotresult"
import RewardsCalculation from "./pages/RewardsCalculation/RewardsCalculation"
import Rewardspage from "./pages/Rewardspage/Rewardspage"




const AllRoutes=()=>{
    return(
     <div>
      <Routes>
        <Route exact={true} path="/" element={<Home/>}/>
        <Route path="/Auth" element={<Auth/>}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route path="/resetpassword/:id/:token" element={<Resetpassword/>}/>
        <Route path="/Questions" element={<Questions/>}/>
        <Route path="/AskQuestion" element={<AskQuestion/>}/>
        <Route path="/Questions/:id" element={<DisplayQuestions/>}/>
        <Route path= "/Tags" element={<Tags/>}/>
        <Route path = "/Users" element ={<Users/>}/>
        <Route path= "/Users/:id" element = {<UserProfile/>}/>
        <Route path= "/chatbot" element={<ChatbotHome/>}/>
        <Route path= "/chatbot/main/:otpvariable" element={<Chatbotresult/>}/>
        <Route path = "/rewards" element = {<Rewardspage/>}/>
        <Route path="/rewards/:id" element = {<RewardsCalculation/>}/>
        
      </Routes>
     </div>
    )
}

export default AllRoutes