import { FETCH_POSTS, RESET_POSTS, ORDERBY_POSTS, UPDATE_POST_VOTE_SCORE_LIST } from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
                orderby: action.sortType,
                activePost: ''
            }  
        case ORDERBY_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
                orderby: action.sortType,
                activePost: ''
            } 
        case UPDATE_POST_VOTE_SCORE_LIST:
            return {
                ...state,
                listPosts: {
                    ...state.listPosts,
                    [action.post.id]: {
                        ...action.post
                    }
                }
            }
        case RESET_POSTS:
            return []        
        default:
            return state
    }
}