import {error as zipcodeError} from './helpers/error'

// Log in user
const getUserActionCreator = (email, password) => dispatch => {
    
    dispatch(getUserStarted())

    return fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {'content-type': 'application/json',
            'accept': 'application/json'},
        body: JSON.stringify({ user:
            {email: email, password: password}
        })
    }).then((response) => response.json())
      .then((user => {
        return user
    }))
    .then(user =>{  
        if (user.error) {
            dispatch(getUserFailed(user.error))
            return user
        } else {
            dispatch(getUserSuccess(user))
            return user
    }})
}

const getUserStarted = () => {return {
    type: 'GET_USER_STARTED'
}}

const getUserSuccess = (user) => {return {
    type: 'GET_USER_SUCCESS', 
    payload: {user}
}}

const getUserFailed = (error) => {return {
    type: 'GET_USER_FAILED',
    payload: {error}
}}

// Sign up user
const signupUserActionCreator = userInfo => dispatch => {
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

const signupUserSuccess = user => {
    return ({
        type: 'SIGNUP_USER_SUCCESS', 
        payload: {user}
    })
}

const signupUserFailed = errors => { 
    return ({
    type: 'SIGNUP_USER_FAILED',
    payload: {errors}
})}

const logoutUser = () => {
    localStorage.removeItem("userId")
    return ({
    type: 'LOGOUT_USER'})
}

const getRegionActionCreator = zipcode => dispatch => {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then((res) => res.json())
        .then(locationData => {
            const getData = (nestedObj, pathArr) => {
                return pathArr.reduce((obj, key) =>
                    (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
            }
            const region = getData(locationData, ["results", 0, "address_components", 2, "long_name"]) === undefined? zipcodeError : getData(locationData, ["results", 0, "address_components", 2, "long_name"])
            if (region !== zipcodeError) {
                dispatch(getRegion(locationData["results"][0]["address_components"][2]["long_name"]))
                dispatch(setZipcode(zipcode))
                return region
            } else {
                dispatch(getRegionFailed(region))
                return region
            }
        })
}

const getRegion = region => {
    return ({
        type: 'GET_REGION',
        payload: {region}
    })
}

const setZipcode = zipcode => {
    return ({
        type: 'SET_ZIPCODE',
        payload: {zipcode}
    })
}

const setError = error => {
    return ({
        type: 'SET_ERROR',
        payload: {error}
    })
}

const getRegionFailed = error => {
    return ({
        type: 'GET_REGION_FAILED',
        payload: {error}
    })
}

const addJournalEntryActionCreator = (content, zipcode, user) => dispatch => {
    
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
    return fetch(`http://localhost:3000/journal-entries/${journalEntryId}`, {
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

const updateJournalEntry = journalEntry => ({
    type: 'UPDATE_JOURNAL_ENTRY',
    payload: {journalEntry}
})

const getMyJournalEntriesActionCreator = userId => dispatch => {
    return fetch(`http://localhost:3000/users/${userId}/journal-entries`)
    .then((res) => res.json())
    .then((myJournalEntries) => { 
        dispatch(getMyJournalEntries(myJournalEntries))
    })
}

const getMyJournalEntries = journalEntries => ({
    type: 'GET_MY_JOURNAL_ENTRIES',
    payload: {journalEntries}
})

const getJournalEntriesActionCreator = () => dispatch => {
    fetch('http://localhost:3000/journal-entries')
    .then((res) => res.json())
    .then((allJournalEntries) => { 
        dispatch(getJournalEntries(allJournalEntries))
    })
}

const getJournalEntries = journalEntries => ({
    type: 'GET_JOURNAL_ENTRIES',
    payload: {journalEntries}
})

export {getUserActionCreator, getUserSuccess, signupUserActionCreator, addJournalEntryActionCreator, getRegionActionCreator, updateJournalEntryRequest, getMyJournalEntriesActionCreator, getJournalEntriesActionCreator, logoutUser, setError}