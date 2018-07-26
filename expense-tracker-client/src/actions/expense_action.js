import { EXPENSE_FETCH, EXPENSE_ADD, EXPENSE_DELETE, EXPENSE_REPORT } from './index'
import Axios from 'axios';

import { loader_start, loader_stop } from './general_loader_action'

export const fetch_expenses = () => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method: 'GET',
            url: 'http://127.0.0.1:3003/expense/' + sessionStorage.getItem('user_id'),
        })
            .then(res => {
                dispatch(loader_stop())
                return dispatch({
                    type: EXPENSE_FETCH,
                    payload: res.data.expenses
                })
            })
            .catch(err => {
                dispatch(loader_stop())
                return dispatch({
                    type: EXPENSE_FETCH,
                    payload: {}
                })
            })
    }
}

export const save_expense = (data, callback) => {
    return dispatch => {
        dispatch(loader_start())
        const param = data.isAdding ? '' : data.expense.id
        Axios({
            method: data.isAdding ? `POST` : `PUT`,
            url: `http://127.0.0.1:3003/expense/` + sessionStorage.getItem('user_id'),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            data: data.expense
        })
            .then(res => {
                dispatch(loader_stop())
                callback()
                return dispatch({
                    type: EXPENSE_ADD,
                    payload: data.expenses
                })
            })
            .catch(err => {
                dispatch(loader_stop())
                return dispatch({
                    type: EXPENSE_ADD,
                    payload: {}
                })
            })
    }
}
export const delete_expense = (id, callback) => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method: `DELETE`,
            url: `http://127.0.0.1:3003/expense/${id}`,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            .then(res => {
                dispatch(loader_stop())
                callback()
                return dispatch({
                    type: EXPENSE_DELETE,
                    payload: {}
                })
            })
            .catch(err => {
                dispatch(loader_stop())
                return dispatch({
                    type: EXPENSE_DELETE,
                    payload: {}
                })
            })
    }
}


export const report_expense = (callback = () => { }) => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method: `GET`,
            url: `http://127.0.0.1:3003/expense/report/` + sessionStorage.getItem('user_id'),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
            .then(res => {
                dispatch(loader_stop())
                callback(res.data.expenses)
                return dispatch({
                    type: EXPENSE_REPORT,
                    payload: {}
                })
            })
            .catch(err => {
                dispatch(loader_stop())
                return dispatch({
                    type: EXPENSE_REPORT,
                    payload: {}
                })
            })
    }
}


