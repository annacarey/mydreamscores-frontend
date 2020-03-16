import userReducer from './userReducer'
import journalReducer from './journalReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    journal: journalReducer
})

export default rootReducer