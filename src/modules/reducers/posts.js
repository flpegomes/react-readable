import { FETCH_POSTS, RESET_POSTS, ORDERBY_POSTS } from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return action.posts      
        case ORDERBY_POSTS: 
            return action.posts 
        case RESET_POSTS:
            return []
        
        default:
            return state
    }
}