import { CURRENT_CATEGORY, CURRENT_ORDERBY } from '../actions/menu'

export default function currentMenu ( state = { orderby: 'new' } , action) {
    switch(action.type) {
        case CURRENT_CATEGORY: 
            return {
                ...state, category: action.category
            }
        case CURRENT_ORDERBY: 
            return {
                ...state, orderby: action.orderby
            }
        default:
            return state
    }
}