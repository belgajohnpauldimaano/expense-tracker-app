import { USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR, USER_FETCH_LOCAL} from '../actions'

const defaultState = {
    user : {
        id : '',
        username: ''
    },
    status: 0 // 0 - none, 1 - in progress, 2 - success, 3 - error, 4 - local fetch
}

export default (state = defaultState, action) => {
    console.log(action, 'user')
    switch (action.type) {
        case USER_REGISTRATION_START:
            return {...state, status: 1}
        case USER_REGISTRATION_SUCCESS:
            return {...state, user: action.payload, status: 2}
        case USER_FETCH_LOCAL:
            return {...state, user: action.payload, status: 4}
        case USER_REGISTRATION_ERROR: 
            return {...state, status: 3}
        default :
            return state
    }
}


