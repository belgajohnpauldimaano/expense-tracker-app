import { EXPENSE_FETCH } from './../actions/index'


const defaultState = {
    expenses: [],
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case EXPENSE_FETCH:
            return {
                ...state,
                expenses: action.payload
            }
        default:
            return state
    }
}