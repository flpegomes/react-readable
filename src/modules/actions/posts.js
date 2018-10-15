const api = "http://localhost:3001"
const headers = {
    'Accept': 'application/json',
    'Authorization': 'sadsda'
}

export const FETCH_POSTS = 'FETCH_POSTS'


function fetchPosts (posts) {
    return {
        type:FETCH_POSTS,
        posts
    }
}


export const getPosts = (category) => {
    return (dispatch) => {
        let url
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
        .then((data) => dispatch(fetchPosts(data)))
    }
}

export const getCategoryPosts = (category) => {
    return (dispatch) => {
        fetch(`${api}/${category}/posts`, {headers})
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