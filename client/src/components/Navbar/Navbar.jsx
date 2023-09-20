
import { Link ,useNavigate} from "react-router-dom"
import logo from '../../assets/logo.png'
import search from "../../assets/search-solid.svg"
import Avatar from  "../../components/Avatar/Avatar"
import "./Navbar.css"
import { setCurrentUser } from "../../actions/currentUser"
import {useSelector,useDispatch} from "react-redux"
import { useEffect } from "react"
import decode from "jwt-decode"


const Navbar = () => {

    //we shouln't get data always from localstorage for that we need to store in reducer and use
    //retreiving data from reducer(getItem) ,for this use useSelector
    //state is nothing but store
   var User = useSelector((state)=> (state.currentUserReducer))
   console.log(User)
   // after user logins,when we refersh login button not disappearing, to fix this,use useDispatch
   //logout is visible only for signup or login line no:9 and 20 actions/auth
   //so for that we have to use dispatch here with useEffect
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handlelogOut = () => {
    dispatch({type:"LOGOUT"})
    navigate('/')
    dispatch(setCurrentUser(null))
 }

   useEffect(() => {
    //to check the expire time of token
    const token = User?.token
    if(token){
        const decodedToken = decode(token)
        //if decodedToken has value
        if(decodedToken.exp * 1000 < new Date().getTime()){
            handlelogOut()
        }//account gets loggedout after 1 hr by decoding value in token
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
   },[User?.token,dispatch]) //whenever above line occurs this dispatch in dependency calls
    //here useEffect applies sideeffects whenever navbar is available on Home page

     

    return (

        <nav className="main-nav">
            <div className="navbar">
                <Link to="/" className="nav-item nav-logo">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to="/" className="nav-item nav-btn">About</Link>
                <Link to="/" className="nav-item nav-btn">Products</Link>
                <Link to="/" className="nav-item nav-btn">For Teams</Link>
                <form>
                    <input type="text" placeholder="Search...." />
                    <img src={search} alt="search" width="18" className="search-icon"/>
                </form>
                { User  === null ?
                <Link to ="/Auth" className="nav-item nav-links">Log in</Link>:
                <>
                <Avatar backgroundColor="#009dff" px="10px" py="7px" 
                borderRadius="50%" color="white"><Link to= {`/Users/${User.result._id}`}
                style={{color:"white" ,textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                <button className="nav-item nav-links" onClick={handlelogOut}>Log out</button>
                </>
                }
            </div>
        </nav>

    )
}

export default Navbar