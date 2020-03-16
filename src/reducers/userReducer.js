
const initialState = {
    loading: false,
    error: null,
    currentUser: {
        id: "",
        email: "",
        password_digest: "",
        zip_code: "",
        phone_number: ""
    }
}

function userReducer(state = initialState, action) {
    switch(action.type) {
        
        case 'GET_USER_STARTED':
            return {...state, loading: true }
        case 'GET_USER_SUCCESS':
            return {...state, loading: false, error: null, currentUser: action.payload.user}
        case 'GET_USER_FAILED':
            return {...state, loading: false, error: action.payload }
        case 'SET_USER_ZIPCODE':
            return {...state, currentUser: {...state.currentUser, zip_code: action.payload.zip_code} }
        default:
            return state
    }
}

export default userReducer