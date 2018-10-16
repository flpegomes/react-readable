export const CURRENT_ORDERBY = 'CURRENT_ORDERBY'
export const CURRENT_CATEGORY = 'CURRENT_CATEGORY'


export const selectCategory = (category) => {
    return {
      type: CURRENT_CATEGORY, 
      category
    }
}

export const selectOrderBy = (orderby) => {
    return {
      type: CURRENT_ORDERBY, 
      orderby
    }
}

