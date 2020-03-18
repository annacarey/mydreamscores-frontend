// Log in user
const getUserActionCreator = (email, password) => dispatch => {
    dispatch(getUserStarted())

    return fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ user:
            {email: email, password_digest: password}
        })
    }).then((response) => response.json())
      .then((user) => {
        user.error? dispatch(getUserFailed(user.error)) : dispatch(getUserSuccess(user))
      })
}

const getUserStarted = () => ({
    type: 'GET_USER_STARTED'
})

const getUserSuccess = (user) => {
    return ({
        type: 'GET_USER_SUCCESS', 
        payload: {user}
    })
}

const getUserFailed = (errors) => ({
    type: 'GET_USER_FAILED',
    payload: {errors}
})

// Sign up user
const signupUserActionCreator = (userInfo) => dispatch => {
    dispatch(signupUserStarted())

    return fetch('http://localhost:3000/signup', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ user:
            userInfo
        })
    }).then((response) => response.json())
      .then((user) => {
            user.error? dispatch(signupUserFailed(user.error)) : dispatch(signupUserSuccess(user))
            return user
      })
}

const signupUserStarted = () => ({
    type: 'SIGNUP_USER_STARTED'
})

const signupUserSuccess = (user) => {
    return ({
        type: 'SIGNUP_USER_SUCCESS', 
        payload: {user}
    })
}

const signupUserFailed = (errors) => ({
    type: 'SIGNUP_USER_FAILED',
    payload: {errors}
})

const addJournalEntryActionCreator = (content, zipcode, user) => (dispatch) => {
    dispatch(addJournalEntryStarted())
    return fetch('http://localhost:3000/journal-entries', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ content, zipcode, user
        })
        }).then((response) => response.json())
        .then((journalEntry) => {
            dispatch(addJournalEntry(journalEntry))
        })
}

const addJournalEntryStarted = () => ({
    type: 'ADD_JOURNAL_ENTRY_STARTED'
})

const addJournalEntry = journalEntry => ({
    type: 'ADD_JOURNAL_ENTRY',
    payload: {journalEntry}
})

const updateJournalEntryRequest = (userId, journalEntryId) => dispatch => {
    fetch(`http://localhost:3000/journal-entries/${journalEntryId}`, {
        method: "PATCH",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ userId, journalEntryId
        })
        }).then((response) => response.json())
        .then((journalEntry) => {
            dispatch(updateJournalEntry(journalEntry))
        })
}

const updateJournalEntry = (journalEntry) => ({
    type: 'UPDATE_JOURNAL_ENTRY',
    payload: {journalEntry}
})

export {getUserActionCreator, signupUserActionCreator, addJournalEntryActionCreator, updateJournalEntryRequest}