import { SAMPLE_ACTION } from './action_types'

export const sample_action = (text) => {
    return {
        type : SAMPLE_ACTION,
        payload : {text}
    }
}