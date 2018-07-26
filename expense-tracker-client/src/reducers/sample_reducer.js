
import { SAMPLE_ACTION } from '../actions'

const defaultState = {
    text : 'helllo'
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SAMPLE_ACTION : 
            return action.payload;
        default :
            return state;
    }
}