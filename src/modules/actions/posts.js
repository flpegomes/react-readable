import { schema, normalize } from 'normalizr'
import uuidv4 from 'uuid'

const api = "http://localhost:3001"
const headers = {
    'Accept': 'application/json',
    'Authorization': 'sadsda'
}

//POSTS
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POST_LIST = 'UPDATE_POST_LIST'
export const RESET_POST = 'RESET_POST'

//COMMENTS
export const MERGE_COMMENTS = 'MERGE_COMMENTS'
export const UPDATE_COMMENT_LIST = 'UPDATE_COMMENT_LIST'


function fetchPosts (posts) {
    return {
        type:FETCH_POSTS,
        posts
    }
}

export const updatePost = (post) => {
    return {
      type: UPDATE_POST, 
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

export const resetPost = () => {
    return {
        type: RESET_POST,
    }
}

/*
 *  EDIT - 
 *  Parametros: 
 *      postId: Id do post a ser editado
 *      content: conteúdo do post (title e body) 
 */
export const editPost = (postId, content) => {
    return (dispatch) => {
        fetch(`${api}/posts/${postId}`, {
            method: 'PUT', headers: {
                ...headers,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({title: content.title, body: content.body, timestamp: Date.now() })
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((data) => dispatch(updatePost(data)))
        .catch((erro) => console.log(erro))
    }
}

/*
 * DELETE - 
 * Parametros:
 *      postId: Id do post a ser deletado.
 */
export const deletePost = (postId) => {
    return (dispatch) => {
        fetch(`${api}/posts/${postId}`, {
            method: 'DELETE', headers: {
                ...headers,
                'Content-Type': 'application/json'
            }, 
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then(() => dispatch(getPosts('all')))
        .then(() => dispatch(resetPost()))
        .catch((erro) => console.log(erro))
    }
}

/*
 * POST - 
 * Parametros:
 *      post: Objeto com os dados do post, 
 *              id, timestamp, title, body, author, category.
 */
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

/*
 * GET - 
 * Parametros:
 *      Se categoria for 'all' trazer todos os post,
 *      se for diferente de 'all' trazer os posts da categoria especificada no parametro
 */
export const getPosts = (category) => {
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
        .then((data) => {
            const postsSchema = new schema.Entity('posts')
            const postsListSchema = [postsSchema]
            const normalizedData = normalize(data, postsListSchema)
            dispatch(fetchPosts(normalizedData.entities.posts))
        })
        .catch((erro) => console.log(erro))
    }
}

/*
 * GET - 
 * Parametros:
 *      postId: id do post 
 */
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
        .then((data) => dispatch(fetchPost(data)))
        .then(() => dispatch(getPostComments(postId)))
        .catch((error) => console.log(error))
    }
}

/*
 * POST - 
 * Parametros:
 *      postId  : id do post 
 *      vote    : tipo de voto(like, dislike) upVote ou downVote
 */
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
        .then((response) => dispatch(updatePost(response)))
        .catch((erro) => console.log(erro))
    }
}


//COMMENTS
export const mergePostComments = (comments) => {
    return {
        type: MERGE_COMMENTS,
        comments
    }
}

export const updateCommentList = (comment) => {
    return {
      type: UPDATE_COMMENT_LIST, 
      comment
    }
}

/*
 * POST - 
 * Parametros:
 *      postId  : id do post 
 *      vote    : tipo de voto(like, dislike) upVote ou downVote
 */
export const updateCommentVote = (id, vote) => {
    return (dispatch) => {
        fetch(`${api}/comments/${id}`, {
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
        .then((response) => dispatch(updateCommentList(response)))
        .catch((erro) => console.log(erro))
    }
}

/*
 * POST - 
 * Parametros:
 *      comment: Objeto com os dados do post, 
 *              id, timestamp, body, author, parentId(id do post).
 */
export const newComment = (comment) => {
    return (dispatch) => {
        fetch(`${api}/comments/`, {
            method: 'POST', headers: {
                ...headers,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                id: uuidv4(),
                timestamp: Date.now(),
                body: comment.body,
                author: comment.author,
                parentId: comment.parentId
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((response) => dispatch(updateCommentList(response)))
        .catch((erro) => console.log(erro))
    }
}

/*
 * GET - 
 * Parametros:
 *      postId: trazer todos os comentários do id do post informado
 */
export const getPostComments = (postId) => {
    return (dispatch) => {
        let url = `${api}/posts/${postId}/comments`
        fetch(url, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                return response
            })
        .then((response) => response.json())
        //.then((data) => orderByLists(orderby, data))
        .then((data) => {
            const commentsSchema = new schema.Entity('comments')
            const commentsListSchema = [commentsSchema]
            const normalizedData = normalize(data, commentsListSchema)
            dispatch(mergePostComments(normalizedData.entities.comments))
        })
        .catch((erro) => console.log(erro))
        
        
    }   
}

/*
 * DELETE - 
 * Parametros:
 *      commentId: usado para deletar o comentário informado
 *      parentId: usado para atualizar a lista de comentários do post
 */
export const deleteComment = (commentId, parentId) => {
    return (dispatch) => {
        fetch(`${api}/comments/${commentId}`, {
            method: 'DELETE', headers: {
                ...headers,
                'Content-Type': 'application/json'
            }, 
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((response) => dispatch(getPostComments(parentId)))
        .catch((erro) => console.log(erro))
    }
}

/*
 *  EDIT - 
 *  Parametros: 
 *      commentId: Id do comentário a ser editado
 *      body: conteúdo do comentário 
 */
export const editComment = (commentId, body) => {
    return (dispatch) => {
        fetch(`${api}/comments/${commentId}`, {
            method: 'PUT', headers: {
                ...headers,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({body: body, timestamp: Date.now() })
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((response) => dispatch(updateCommentList(response)))
        .catch((erro) => console.log(erro))
    }
}



