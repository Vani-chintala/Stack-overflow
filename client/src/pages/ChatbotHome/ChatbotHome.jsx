import { useState } from "react"
import "./ChatbotHome.css"
import { useDispatch, useSelector } from "react-redux"
import { sendotp, verifyotp } from "../../actions/userotp"
import { useNavigate } from "react-router-dom"

const ChatbotHome = () => {

    const [email, setEmail] = useState('')
    const [otpvariable, setOtpVariable] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const User = useSelector((state) => (state.currentUserReducer))

    const handleSubmitotp = (e) => {
        e.preventDefault()
        if (User === null) {
            alert("Please login")
            navigate("/Auth")
        } else {
            if (!email) {
                alert("Please enter email to verify your email")
            } else {
                dispatch(sendotp({ email }))
            }

        }
    }


    const handleverifyotp = (e) => {
        e.preventDefault()
        console.log(otpvariable)
        if (!otpvariable) {
            alert("Enter otp to verify")
        } else if (otpvariable.length < 6 || otpvariable.length > 6) {
            alert("otp length must be 6 characters only")
        } else {
            dispatch(verifyotp({ otpvariable }, navigate))
        }

    }



    return (
        <div className="otp-container">
            <div className="title">
                <h3><b>OTP VERIFICATION</b></h3>
            </div><br />
            <div className="form-otp">
                <form onSubmit={handleSubmitotp}>
                    <label>
                        <input type="email" placeholder="Enter your Email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label> <br />
                    <button type="submit" >Send OTP</button>
                </form>
            </div>

            <div className="otp-container-2">
                <form onSubmit={handleverifyotp}>
                    <div className="input-fields">
                        <input type="number" className="input-num" value={otpvariable}
                            onChange={(e) => setOtpVariable(e.target.value)} />

                        <button type="submit" >Verify OTP</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ChatbotHome