export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return d.toLocaleDateString() + '  -  '  + time.substr(0, 5) + time.slice(-2)
}

//usado para colocar a primeira letra do autor no avatar
export const formatAvatar = (str = '') => {
    return typeof str !== 'string' ? '' : str.substring(0, 1).toUpperCase()
}

//ordena os dados de acordo com os parametros
export const orderByLists = (orderby, data) => {
    return data.sort((a, b) => {
      if (orderby === 'new') {
        return b.timestamp - a.timestamp
      }
      if (orderby === 'hot') {
        return b.voteScore - a.voteScore
      }
      return null
    })
}