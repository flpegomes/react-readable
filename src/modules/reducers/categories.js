import { FETCH_CATEGORIES } from '../actions/categories'

export default function categories ( state = [] , action) {
    switch(action.type) {
        case FETCH_CATEGORIES: 
            return action.categories
        default:
            return state
    }
}
