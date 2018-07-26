import { USER_FETCH_LOCAL, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR, USER_LOGOUT } from './action_types'

import axios from 'axios'

import { loader_start, loader_stop } from './general_loader_action'


export const fetch_user_local = () => {
    const id = sessionStorage.getItem('user_id')
    const username = sessionStorage.getItem('username')
    return dispatch => {
        // alert(id + ' ' + username)
        dispatch(loader_start())
        if (id && username) {
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:3003/user',
                data: { id: id, username: username }
            })
                .then((res) => {
                    dispatch(loader_stop())
                    return dispatch({
                        type: USER_FETCH_LOCAL,
                        payload: res.data.data
                    })
                })
                .catch((err) => {
                    dispatch(loader_stop())
                    return dispatch({
                        type: USER_REGISTRATION_ERROR,
                        payload: {}
                    })
                })
        } else {
            dispatch(loader_stop())
            return dispatch({
                type: USER_FETCH_LOCAL,
                payload: {
                    id: '',
                    username: ''
                }
            })
        }
    }
}

export const register_user = (data) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:3003/user/register',
            data: data
        })
            .then((res) => {
                sessionStorage.setItem('user_id', res.data.data.id)
                sessionStorage.setItem('username', res.data.data.username)
                return dispatch({
                    type: USER_REGISTRATION_SUCCESS,
                    payload: res.data.data
                })
            })
            .catch((err) => {
                return dispatch({
                    type: USER_REGISTRATION_ERROR,
                    payload: {
                        id: '',
                        username: ''
                    }
                })
            })
    }
}

export const logout_user = () => {
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('username')
    return dispatch => {
        return dispatch({
            type: USER_LOGOUT,
            payload: {
                id: '',
                username: ''
            }
        })
    }
}