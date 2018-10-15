import { FETCH_CATEGORIES, CURRENT_CATEGORY } from '../actions/categories'

export default function categories ( state = [] , action) {
    switch(action.type) {
        case FETCH_CATEGORIES: 
            return action.categories
        default:
            return state
    }
}
