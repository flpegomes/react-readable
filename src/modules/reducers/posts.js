import { FETCH_POSTS } from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return action.posts
        default:
            return state
    }
}