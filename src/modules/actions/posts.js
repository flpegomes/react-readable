import { orderByLists } from '../../utils/helpers'

const api = "http://localhost:3001"
const headers = {
    'Accept': 'application/json',
    'Authorization': 'sadsda'
}

export const FETCH_POSTS = 'FETCH_POSTS'
export const ORDERBY_POSTS = 'ORDERBY_POSTS'
export const RESET_POSTS = 'RESET_POSTS'


function fetchPosts (posts) {
    return {
        type:FETCH_POSTS,
        posts
    }
}

export const getPosts = (category, orderby) => {
    return (dispatch) => {
        let url
        dispatch(resetPosts())
        if(category === 'all') {
            url = `${api}/posts`
        }
        else 
        {
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
        .then((data) => dispatch(orderByPosts(orderby, data)))
    }
}

export const getPostDetail= (id) => {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {headers})
            .then((response) => {
                if (!response.ok) {
                throw Error(response.statusText)
                }
                return response
            })
        .then((response) => response.json())
        .then((data) => dispatch(fetchPosts(data)))
    }
}

export const orderByPosts = (orderby, posts) => {
    const sortedPost = orderByLists(orderby, posts)
    return {
      type: ORDERBY_POSTS, posts: sortedPost, sortType: orderby
    }
}

export const resetPosts = (request) => {
    return {
      type: RESET_POSTS, payload: request
    }
}