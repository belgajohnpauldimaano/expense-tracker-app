import { GENERAL_LOADER_START, GENERAL_LOADER_STOP } from './../actions/index'

const defaultState = {
    msg: ``,
    loadingState: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GENERAL_LOADER_START:
            return {
                ...state,
                msg : action.payload.msg,
                loadingState: true
            }
        case GENERAL_LOADER_STOP:
            return {
                ...state,
                msg : action.payload.msg,
                loadingState: false
            }
        default:
            return state
    }
}