import { USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR, USER_FETCH_LOCAL, USER_LOGOUT } from '../actions'

const defaultState = {
    user: {
        id: '',
        username: ''
    },
    status: 0
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_REGISTRATION_START:
            return { ...state, status: 1 }
        case USER_REGISTRATION_SUCCESS:
            return { ...state, user: action.payload, status: 2 }
        case USER_FETCH_LOCAL:
            return { ...state, user: action.payload, status: 4 }
        case USER_LOGOUT:
            return { ...state, user: action.payload }
        case USER_REGISTRATION_ERROR:
            return { ...state, status: 3 }
        default:
            return state
    }
}


