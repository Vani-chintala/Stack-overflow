
import {useSelector} from "react-redux"
import User from "./User"


const UserList = () => {

    const loginUsers = useSelector((state) => state.usersReducer)
    //console.log(loginUsers)
    return (
        <div className="user-list-container">
           {
            loginUsers.map((user)=>(
                <User user={user} key={user._id}/>
            ))
           }
        </div>
    )
}

export default UserList