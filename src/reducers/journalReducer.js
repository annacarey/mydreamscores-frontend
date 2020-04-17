
const initialState = {
    loading: false,
    error: null,
    currentJournalEntry: {
        id: "",
        content: "",
        zipcode: "",
        sentiment: 0,
        magnitude: 0
    },
    myJournalEntries: [],
    allJournalEntries: []
}

function journalReducer(state = initialState, action) {
    switch(action.type) {
        case 'ADD_JOURNAL_ENTRY_STARTED':
            return {...state, loading: true }
        case 'ADD_JOURNAL_ENTRY': 
            return {...state, currentJournalEntry: action.payload.journalEntry, loading: false}
        case 'UPDATE_JOURNAL_ENTRY':
            return {...state, currentJournalEntry: action.payload.journalEntry, loading: false}
        case 'GET_MY_JOURNAL_ENTRIES':
            return {...state, myJournalEntries: action.payload.journalEntries}
        case 'GET_JOURNAL_ENTRIES':
            return {...state, allJournalEntries: action.payload.journalEntries}
        default:
            return state
    }
}

export default journalReducer

