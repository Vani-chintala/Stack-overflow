
import { useSelector } from "react-redux"

import Badge from "../../assets/badge.jpg"
import Pointsimage from "../../assets/points image.jpg"
import "./Rewardspage.css"
import {useNavigate } from "react-router-dom"
    
const Rewardspage = () => {

    const User = useSelector((state) => (state.currentUserReducer))
    console.log(User)
    const questionsList = useSelector(state => state.questionsReducer)
    console.log(questionsList)
    
    const navigate = useNavigate()

    const userRewards = () => {
        if(!User){
            alert("Please login")
            navigate("/Auth")
        }else{
            navigate(`/rewards/${User.result._id}`)
        }
    }


    return(

        <div className="fullsection" onClick={userRewards}>
        <div className = "section-1">
                 <h3>If User  asks a question and if it reaches 5 upvotes then particular User gets  
                 <img src={Pointsimage} alt="Points" style={{height : "100px",width : "100px"}}/> points</h3>
        </div> 
        
         <div className = "section-2">
         <h3>If User answers 5 questions then User gets Honor 
          <img src={Badge} alt="Badge" style={{height : "120px",width : "120px"}}/> and 
          <img src={Pointsimage} alt="Points" style={{height : "100px",width : "100px"}}/> points
          </h3>
         </div>
         
         
        </div>
    )
}


export default Rewardspage