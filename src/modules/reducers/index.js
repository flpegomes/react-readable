import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import currentMenu from './menu'


export default combineReducers({
    categories,
    posts,
    currentMenu,
})