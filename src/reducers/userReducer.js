
const initialState = {
    loading: false,
    error: null,
    currentUser: {
        id: "",
        email: "",
        region: "",
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
            return {...state, loading: false, error: action.payload.errors }
        case 'SET_REGION':
            return {...state, currentUser: {...initialState.currentUser, region: action.payload.region, zipcode: action.payload.zipcode}}
        case 'GET_REGION_FAILED':
            return {...state, error: action.payload.error}
        case 'SET_ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export default userReducer