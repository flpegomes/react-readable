import { CURRENT_CATEGORY } from '../actions/categories'

export default function currentMenu ( state = [] , action) {
    switch(action.type) {
        case CURRENT_CATEGORY: 
            return {
                category: action.category
            }
        default:
            return state
    }
}