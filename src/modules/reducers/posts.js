import { FETCH_POSTS, RESET_POSTS, ORDERBY_POSTS, UPDATE_POST_VOTE_SCORE_LIST, UPDATE_POST_LIST, FETCH_POST } from '../actions/posts'

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
        case FETCH_POST:
            return {
                ...state,
                postDetail: action.post
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
        case UPDATE_POST_LIST:
            return {
                ...state,
                listPosts: {
                    [action.post.id] : action.post,
                    ...state.listPosts,
                    
                }
            }
        case RESET_POSTS:
            return []        
        default:
            return state
    }
}