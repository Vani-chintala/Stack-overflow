
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import Avatar from "../../components/Avatar/Avatar"
import "./UserProfile.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBirthdayCake,faPen } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import { useState } from "react"
import EditProfileForm from "./EditProfileForm"
import ProfileBio from "./ProfileBio"


const UserProfile = () => {


    const { id } = useParams()
    const loginUsers = useSelector((state) => state.usersReducer)
    //loginUsers or User in navbar are same
    const currentProfile = loginUsers.filter((user) => user._id === id)[0]
    //console.log(currentProfile) 
    //here we can click any user (not logged in also)
    const currentUser = useSelector((state) => state.currentUserReducer)
    //current user is logined user at present
    const [Switch, setSwitch] = useState(false)

    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple"
                                color="white" fontSize="50px" px="40px" py="30px">
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} />
                                    Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type="button" onClick={() => setSwitch(true)} className="edit-profile-btn">
                                    <FontAwesomeIcon icon={faPen} />Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile