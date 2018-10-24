import {    FETCH_POSTS, 
            RESET_POSTS, 
            UPDATE_POST,
            UPDATE_POST_LIST, 
            FETCH_POST,
            MERGE_COMMENTS,
            UPDATE_COMMENT_LIST
} from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
            }  
        case FETCH_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.post,
                    
                }
            } 
        case UPDATE_POST:
            return {
                ...state,
                listPosts: {
                    ...state.listPosts,
                    [action.post.id]: {
                        ...action.post,
                        
                    }
                },
                post: {
                    ...state.post,
                    ...action.post,
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
        case MERGE_COMMENTS:
            return {
                ...state,
                post: {
                    ...state.post,
                    replies: action.comments
                }
            } 
        case UPDATE_COMMENT_LIST: 
            return {
                ...state,
                post: {
                    ...state.post,
                    replies: {
                        ...state.post.replies,
                        [action.comment.id] : action.comment,
                    }
                }
            }
        default:
            return state
    }
}