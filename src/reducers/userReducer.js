
const initialState = {
    loading: false,
    error: null,
    currentUser: {
        id: "",
        email: "",
        password: "",
        zipcode: "",
        phoneNumber: ""
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
        case 'SIGNUP_USER_STARTED':
            return {...state, loading: true }
        case 'SIGNUP_USER_SUCCESS':
            return {...state, loading: false, error: null, currentUser: action.payload.user}
        case 'SIGNUP_USER_FAILED':
            return {...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default userReducer