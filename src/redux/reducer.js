
import { TEST } from '@/redux/constants'

/**
 * Define initial state
 */
let initialState = {
    example: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST: {
            return state
        }
        default: {
            return state
        }
    }
}

export default rootReducer