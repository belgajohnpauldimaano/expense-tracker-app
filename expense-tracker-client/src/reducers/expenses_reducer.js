import { EXPENSE_FETCH, EXPENSE_REPORT } from './../actions/index'


const defaultState = {
    expenses: [],
    expenseReport: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case EXPENSE_FETCH:
            return {
                ...state,
                expenses: action.payload
            }
        case EXPENSE_REPORT:
            return {
                ...state,
                expenseReport: action.payload
            }
        default:
            return state
    }
}