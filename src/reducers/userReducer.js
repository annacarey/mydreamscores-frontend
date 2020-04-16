
const initialState = {
    loading: false,
    error: null,
    region: "",
    currentUser: {
        id: "",
        email: "",
        password: "",
        zipcode: "",
        phoneNumber: "",
        okToContact: false,
        okToSaveEntries: false
    }
}

function userReducer(state = initialState, action) {
    switch(action.type) {
        
        case 'GET_USER_STARTED':
            return {...state, loading: true }
        case 'GET_USER_SUCCESS':
            return {...state, loading: false, error: null, currentUser: action.payload.user}
        case 'GET_USER_FAILED':
            return {...state, loading: false, error: action.payload.error }
        case 'SIGNUP_USER_STARTED':
            return {...state, loading: true }
        case 'SIGNUP_USER_SUCCESS':
            return {...state, loading: false, error: null, currentUser: action.payload.user}
        case 'SIGNUP_USER_FAILED':
            return {...state, loading: false, error: action.payload.error }
        case 'LOGOUT_USER':
            return {...state, currentUser: initialState.currentUser}
        case 'GET_REGION':
            return {...state, region: action.payload.region}
        default:
            return state
    }
}

export default userReducer