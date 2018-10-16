import { FETCH_POSTS, RESET_POSTS, ORDERBY_POSTS, UPDATE_POST_VOTE_SCORE_LIST } from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return {    
                ...state,
                listPosts: action.posts
                
            }     
        case ORDERBY_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
                orderby: action.sortType,
                activePost: ''
            } 
            
        case RESET_POSTS:
            return []        
        default:
            return state
    }
}