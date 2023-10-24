
import { useState } from "react"
import "./Chatbotresult.css"
import { useSelector} from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import chatboticon from "../../assets/chatboticon.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"



const Chatbotresult = () => {

    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('')
    
   
    const User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate()
    const handleSend = async(e) => {
        e.preventDefault()
        if(User){
            if(!prompt){
                alert("Please enter any question to get answer")
            }else{
                const outputtext = await axios.post("http://localhost:5000/chat/chatbot",{
                    "method" : "POST",
                    "headers" : {
                        "Content-Type" : "application/json"
                    },
                    "body" : JSON.stringify(prompt)
                })
                const data = await outputtext.json()
                data.then((res)=> {
                    setResponse(res)
                    setPrompt("")
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
        else{
            alert("Please login and verify your account before asking a question")
            navigate('/Auth')
            navigate('/chatbot')
        }
       
    }



    return (
        <div className="com-container">
            <div className="semi-container-1">
                <form onSubmit={handleSend}>
                    <input type="text" placeholder="       Ask your question"
                        value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        <FontAwesomeIcon icon={faUser} className="usericon" style={{ marginRight: "10px", height: "18px" }} />
                    <button type="submit" >Send</button>

                </form>
            </div>
            <br/>
            <div className="semi-container-2">
                <img src={chatboticon} height="18px" width="21px"
                    alt="chatboticon" style={{ marginRight: "10px" }} />
               {
                 response   === " " ?
                 <h3>Loading</h3> : 
                  <p>{response.data}</p>
               }
            </div>
        </div>
    )
}

export default Chatbotresult