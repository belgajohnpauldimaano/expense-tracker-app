import { CATEGORY_FETCH, CATEGORY_ADD, CATEGORY_SAVE, CATEGORY_DELETE } from './index'
import Axios from 'axios';

import { loader_start, loader_stop } from './general_loader_action'

export const fetch_categories = (cb = null) => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method : 'GET',
            url : 'http://127.0.0.1:3003/category',
        })
        .then(res => {
            dispatch(loader_stop())
            if (cb) {
                console.log(res.data.categories, 'res.data')
                cb(res.data.categories)
            }
            return dispatch ({
                type: CATEGORY_FETCH,
                payload: res.data.categories
            })
        })
        .catch(err => {
            dispatch(loader_stop())
            return dispatch ({
                type: CATEGORY_FETCH,
                payload: {}
            })
        })
    }
}


export const save_category = (data, callback) => {
    return dispatch => {
        dispatch(loader_start())
        const param = data.isAdding ? '' : data.category.id
        Axios({
            method : data.isAdding ? `POST` : `PUT`,
            url : `http://127.0.0.1:3003/category/${param}`,
            headers:{'Content-Type': 'application/json; charset=utf-8'},
            data: data.category
        })
        .then(res => {
            dispatch(loader_stop())
            callback()
            return dispatch ({
                type: CATEGORY_SAVE,
                payload: data.category
            })
        })
        .catch(err => {
            dispatch(loader_stop())
            return dispatch ({
                type: CATEGORY_SAVE,
                payload: {}
            })
        })
    }
}

export const delete_category = (id, callback) => {
    return dispatch => {
        dispatch(loader_start())
        Axios({
            method : `DELETE`,
            url : `http://127.0.0.1:3003/category/${id}`,
            headers:{'Content-Type': 'application/json; charset=utf-8'},
        })
        .then(res => {
            dispatch(loader_stop())
            callback()
            return dispatch ({
                type: CATEGORY_DELETE,
                payload: {}
            })
        })
        .catch(err => {
            dispatch(loader_stop())
            return dispatch ({
                type: CATEGORY_DELETE,
                payload: {}
            })
        })
    }
}