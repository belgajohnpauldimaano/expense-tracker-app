import { GENERAL_LOADER_START, GENERAL_LOADER_STOP } from './action_types'

export const loader_start = (msg = `Loading`) => {
    console.log('start')
    return({
        type: GENERAL_LOADER_START,
        payload: {
            msg: msg,
            loadingState: true
        }
    })
}

export const loader_stop = () => {
    console.log('stop')
    return({
        type: GENERAL_LOADER_STOP,
        payload: {
            msg: ``,
            loadingState: false
        }
    })
}