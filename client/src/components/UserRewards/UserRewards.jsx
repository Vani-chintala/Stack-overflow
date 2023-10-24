

const UserRewards = ({User,questionsList}) => {
    return(
        <div>
        {
            User === " " ?
            <p>No User vailable</p> :
            <section>
            {/* <p>{User.result.name}</p> */}
            <p>{questionsList.data.userId}</p>
            <p>{questionsList.data.filter(ques => ques.userId === User.result._id).map(ques =>
                <p>{ques.length}</p>
                )} questions
            
            </p>
            </section>
        }
        </div>
    )
}

export default UserRewards