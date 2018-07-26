import { CATEGORY_FETCH } from './../actions/index'


const defaultState = {
    categories: [],
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case CATEGORY_FETCH:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}