const getUserActionCreator = (email, password) => dispatch => {
    dispatch(getUserStarted())

    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ user:
            {email: email, password_digest: password}
        })
    }).then((response) => response.json())
      .then((user) => {
          setTimeout(() => {
            return user.error? dispatch(getUserFailed(user.error)) : dispatch(getUserSuccess(user)), 2000
        })
      })
}

const getUserStarted = () => ({
    type: 'GET_USER_STARTED'
})

const getUserSuccess = (user) => ({
    type: 'GET_USER_SUCCESS', 
    payload: {user}
})

const getUserFailed = (errors) => ({
    type: 'GET_USER_FAILED',
    payload: {errors}
})

const setZipcodeActionCreator = zipCode => ({
    type: 'SET_USER_ZIPCODE',
    payload: {zipCode}
})

const timesUpActionCreator = () => ({
    type: 'TIMES_UP'
})

const updateCurrentJournalEntry = (content) => ({
    type: 'TIMES_UP',
    payload: {content}
})

export {getUserActionCreator, setZipcodeActionCreator, timesUpActionCreator, updateCurrentJournalEntry}