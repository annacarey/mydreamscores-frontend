import userReducer from './userReducer'
import journalReducer from './journalReducer'
import { combineReducers } from 'redux'

const appReducer = combineReducers({
    user: userReducer,
    journal: journalReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer