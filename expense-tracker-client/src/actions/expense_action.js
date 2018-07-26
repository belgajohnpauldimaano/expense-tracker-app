import { EXPENSE_FETCH, EXPENSE_ADD } from './index'
import Axios from 'axios';

import { loader_start, loader_stop } from './general_loader_action'

export const fetch_expenses = () => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method : 'GET',
            url : 'http://127.0.0.1:3003/expense/' + sessionStorage.getItem('user_id'),
        })
        .then(res => {
            dispatch(loader_stop())
            return dispatch ({
                type: EXPENSE_FETCH,
                payload: res.data.expenses
            })
        })
        .catch(err => {
            dispatch(loader_stop())
            return dispatch ({
                type: EXPENSE_FETCH,
                payload: {}
            })
        })
    }
}

export const save_expense = (data, callback) => {
    return dispatch => {
        dispatch(loader_start())
        const param = data.isAdding ? '' : data.category.id
        Axios({
            method : data.isAdding ? `POST` : `PUT`,
            url : `http://127.0.0.1:3003/expense/` + sessionStorage.getItem('user_id'),
            headers:{'Content-Type': 'application/json; charset=utf-8'},
            data: data.category
        })
        .then(res => {
            dispatch(loader_stop())
            callback()
            return dispatch ({
                type: EXPENSE_ADD,
                payload: data.category
            })
        })
        .catch(err => {
            dispatch(loader_stop())
            return dispatch ({
                type: EXPENSE_ADD,
                payload: {}
            })
        })
    }
}