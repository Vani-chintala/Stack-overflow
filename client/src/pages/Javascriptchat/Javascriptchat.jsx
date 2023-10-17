
import { useState } from "react"
import "./Javascriptchat.css"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { javascriptchat } from "../../actions/chatbot"
import chatboticon from "../../assets/chatboticon.png"

const Javascriptchat = () => {

    const [text, setText] = useState('')
    //const [response, setResponse] = useState('')
    //const [displaytext, setdisplayText] = useState(false)
    //const [loading,setLoading] = useState('')
    const dispatch = useDispatch()

    const handleSend = (e) => {
        e.preventDefault()
        if (!text) {
            alert("please enter any question")
        } else {
            // setResponse(" ")
            // setdisplayText(true)
            // dispatch(javascriptchat(text,setResponse,setdisplayText))
            dispatch(javascriptchat({text}))
        }
    }



    return (
        <div className="com-container">
            <div className="semi-container-1">
                <form onSubmit={handleSend}>
                    <input type="text" placeholder="Ask your question"
                        value={text} onChange={(e) => setText(e.target.value)} />
                    <button type="submit" >Send</button>

                </form>
            </div>
            <div className="semi-container-2">
                <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px", height: "16px" }} />

                {/* {
                    displaytext ? { text } : " "
                } */}

            </div>
            <div className="semi-container-3">
                <img src={chatboticon} height="21px" width="21px"
                    alt="chatboticon" style={{ marginRight: "10px" }} />
                {/* {
                    response ? "response.data" : " "
                } */}
            </div>
        </div>
    )
}

export default Javascriptchat