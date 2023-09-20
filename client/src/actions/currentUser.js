

export  const setCurrentUser = (data) => {
    return({
        type: "FETCH_CURRENT-USER",
        payload: data
    }
    )
}