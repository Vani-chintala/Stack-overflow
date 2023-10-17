

import { forgotpassword } from "../../actions/auth"
import "./Forgotpassword.css"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"



const Forgotpassword = () => {

    const [email, setEmail] = useState('')
    //const [message,setMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmitLink = (e) => {
        e.preventDefault()
        if (!email) {
            alert("Enter email to continue")
        } else {
            console.log(email)
            dispatch(forgotpassword({ email }, navigate))

            //("Password reset link is successfully sent to your email")
        }
    }

    return (
        <div className="container-1">
            <div width="300px" height="400px" className="forgotpassword-container">
                <div className="title">
                    <h3>Forgot password</h3>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmitLink}>

                        <label htmlFor="email">
                            <h4>Email</h4>
                            <input type="email" name="name"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address" />
                        </label><br /><br />
                        <button type="submit">Send mail</button>
                        {/* <p>{message}</p> */}
                        <p><Link to="/auth" className="login-link">Login</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Forgotpassword