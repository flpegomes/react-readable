import {    FETCH_POSTS, 
            RESET_POSTS, 
            ORDERBY_POSTS, 
            UPDATE_POST_VOTE_SCORE_LIST,
            UPDATE_POST_LIST, 
            FETCH_POST,
            MERGE_COMMENTS,
            UPDATE_COMMENT_VOTE_SCORE_LIST,
            UPDATE_COMMENT_LIST
} from '../actions/posts'

export default function post ( state = [] , action) {
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
            }  
        case ORDERBY_POSTS: 
            return {
                ...state,
                listPosts: action.posts,
            } 
        case FETCH_POST:
            return {
                ...state,
                post: {
                    ...action.post,
                    replies: []
                }
            } 
        case UPDATE_POST_VOTE_SCORE_LIST:
            if(state.post.replies === undefined) {
                state.post.replies = []
            }
            return {
                ...state,
                listPosts: {
                    ...state.listPosts,
                    [action.post.id]: {
                        ...action.post,
                        replies: {
                            ...state.post.replies
                        }
                    }
                },
                post: {
                    ...action.post,
                    replies: {
                        ...state.post.replies
                    }
                }
            }
        case UPDATE_COMMENT_VOTE_SCORE_LIST:
        console.log(state)
            return {
                ...state,
                post: {
                    ...state.post,
                    replies: {
                        ...state.post.replies,
                        [action.comment.id]: action.comment
                    }
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
        case UPDATE_POST_LIST:
            return {
                ...state,
                listPosts: {
                    [action.post.id] : action.post,
                    ...state.listPosts,
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
        case RESET_POSTS:
            return []        
        default:
            return state
    }
}