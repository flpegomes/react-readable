export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return d.toLocaleDateString() + '  -  '  + time.substr(0, 5) + time.slice(-2)
}

export const formatAvatar = (str = '') => {
    return typeof str !== 'string' ? '' : str.substring(0, 1).toUpperCase()
}