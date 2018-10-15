const api = "http://localhost:3001"
const headers = {
    'Accept': 'application/json',
    'Authorization': 'sadsda'
  }
  
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY'

function fetchCategories (categories) {
    return {
        type: FETCH_CATEGORIES,
        categories
    }
}

export const selectCategory = (category) => {
    return {
      type: CURRENT_CATEGORY, 
      category
    }
}

export const getCategories = () => {
    return (dispatch) => {
        fetch(`${api}/categories`, {headers})
            .then((response) => {
                if (!response.ok) {
                throw Error(response.statusText)
                }
                return response
            })
        .then((response) => response.json())
        .then((data) => dispatch(fetchCategories(data.categories)))
    }
}