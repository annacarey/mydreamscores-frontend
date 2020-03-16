
const initialState = {
    timesUp: false,
    currentJournalEntry: "",
    journalEntries: [],
    survey: "",
    questions: []
}

function journalReducer(state = initialState, action) {
    switch(action.type) {
        case 'TIMES_UP': 
            return {...state, timesUp: true}
        case 'UPDATE_CURRENT_JOURNAL_ENTRY':
            return {...state, currentJournalEntry: action.payload}
        default:
            return state
    }
}

export default journalReducer