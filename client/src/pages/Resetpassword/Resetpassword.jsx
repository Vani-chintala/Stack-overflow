import { useState } from "react"
import "./Resetpassword.css"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { resetpassword ,resetverification} from "../../actions/auth"


const Resetpassword = () => {
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')


    const { id, token } = useParams()


    const navigate = useNavigate()
    const dispatch = useDispatch()

     useEffect (()=> {
        dispatch(resetverification(id,token))
    }) 


    const updatePasswordfn = (e) => {
        e.preventDefault()
        if (!password || !confirmpassword) {
            alert("Enter details to continue")
        } else if (password !== confirmpassword) {
            alert("Password and confirmpassword must be same")
        } else {
            console.log(password, confirmpassword)
            console.log(id, token)
            dispatch(resetpassword({
                password: password,
                confirmpassword: confirmpassword,
                id: id,
                token: token,
            },navigate))
        }

    }


    return (
        <div className="container-1">
            <div width="300px" height="400px" className="reset-container">
                <div className="title">
                    <h3>Reset password</h3>
                </div>
                <div className="form-container">
                    <form onSubmit={updatePasswordfn}>
                        <label htmlFor="pass">
                            <h4>Enter Password</h4>
                            <input type="password" id="pass" name="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password" />
                        </label>
                        <label htmlFor="confirmpass">
                            <h4>Confirm Password</h4>
                            <input type="password" id="confirmpass" name="confirmpass"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password" />
                        </label><br /><br />
                        <button type="submit" >Update Password</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Resetpassword