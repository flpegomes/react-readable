import { orderByLists } from '../../utils/helpers'
import { schema, normalize } from 'normalizr'
import uuidv4 from 'uuid'

const api = "http://localhost:3001"
const headers = {
    'Accept': 'application/json',
    'Authorization': 'sadsda'
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const ORDERBY_POSTS = 'ORDERBY_POSTS'
export const RESET_POSTS = 'RESET_POSTS'
export const UPDATE_POST_VOTE_SCORE_LIST = 'UPDATE_POST_VOTE_SCORE_LIST'
export const UPDATE_POST_LIST = 'UPDATE_POST_LIST'


function fetchPosts (posts) {
    return {
        type:FETCH_POSTS,
        posts
    }
}

export const getPosts = (category, orderby) => {
    return (dispatch) => {
        let url
        if(category === 'all') {
            url = `${api}/posts`
        } else {
            url = `${api}/${category}/posts`
        }
        fetch(url, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
        .then((response) => response.json())
        .then((data) => orderByLists(orderby, data))
        .then((data) => {
            const postsSchema = new schema.Entity('posts')
            const postsListSchema = [postsSchema]
            const normalizedData = normalize(data, postsListSchema)
            dispatch(fetchPosts(normalizedData.entities.posts))
        })
    }
}

export const getPostDetail = (postId) => {
    return (dispatch) => {
        let url = `${api}/posts/${postId}`
        fetch(url, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
        .then((response) => response.json())
        .then((data) =>  dispatch(fetchPost(data)))
    }
}

export const updatePostVote = (id, vote) => {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
            method: 'POST', headers: {
                ...headers,
                'Content-Type': 'application/json'
              }, 
            body: JSON.stringify({option: vote})
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((response) => dispatch(updateVotePostList(response)))
        .catch((erro) => console.log(erro))
    }
}

export const newPost = (post) => {
    return (dispatch) => {
        fetch(`${api}/posts/`, {
            method: 'POST', headers: {
                ...headers,
                'Content-Type': 'application/json'
              }, 
            body: JSON.stringify({
                id: uuidv4(),
                timestamp: Date.now(),
                title: post.title,
                body: post.body,
                author: post.author,
                category: post.category
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((response) => dispatch(updatePostList(response)))
        .catch((erro) => console.log(erro))
    }
}

export const updateVotePostList = (post) => {
    return {
      type: UPDATE_POST_VOTE_SCORE_LIST, 
      post
    }
}

export const updatePostList = (post) => {
    return {
      type: UPDATE_POST_LIST, 
      post
    }
}

export const fetchPost = (post) => {
    return {
        type: FETCH_POST,
        post
    }
}