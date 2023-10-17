
import "./Chatmainpage.css"
import { useNavigate } from "react-router-dom"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"

const Chatmainpage = () => {

const navigate = useNavigate()

    const chatbotList = [
        {
            topicName: "javascript",
            topicDetails:
                "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;",
        },
        {
            topicName: "python",
            topicDetails:
                "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.",
        },
        {
            topicName: "java",
            topicDetails:
                "Java is a high-level object oriented programming language. Use this tag when you're having problems using or understanding the language itself. ",
        },
        {
            topicName: "html",
            topicDetails:
                "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.",
        },
        {
            topicName: "css",
            topicDetails:
                "CSS is a representation style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts, and animations",
        },
        {
            topicName: "Reactjs",
            topicDetails:
                "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.",
        },
        {
            topicName: "node.js",
            topicDetails:
                "Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. ",
        },
    ]

    const handlechatlist = (topicName) => {
        // if(!verifyotp === success){
        //     alert("Please verify your account before proceeding")
        //     navigate("/chatbot")
        // }else{
        //     navigate(`/chatbot/${topicName}`)
        // }
        
    }


    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <h1 className="title">ChatbotList</h1>
                <p className="statement">
                    Make your work easier with Chatbot.
                </p>
                <p className="statement">
                    Select any topic and ask a question
                </p>
                <div className="list-container" onClick={handlechatlist}>
                    {
                        chatbotList.map((topic, index) =>
                            <div className="topic">
                                <h5 onClick={()=>navigate(`/chatbot/${topic.topicName}`)}>{topic.topicName} </h5>
                                <p>{topic.topicDetails}</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Chatmainpage