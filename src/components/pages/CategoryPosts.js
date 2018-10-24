import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PostList from '../post/PostList'
import NewPost from '../post/NewPost'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import { getCategories } from '../../modules/actions/categories'
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import { withRouter } from 'react-router-dom'
import { getPosts } from '../../modules/actions/posts';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash'
import { orderByLists } from '../../utils/helpers'




const styles = {
    paper: {
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
      padding:32,
      maxWidth: 1000
    },
    subtitle: {
        fontSize: 12,
        color: '#aaa',
        flex: 1,
        textAlign: 'right'
    },
}

class CategoryPosts extends Component {
    
    componentDidMount() {
        const category = this.props.match.params.category
        this.props.dispatch(getCategories());
        this.props.dispatch(selectCategory(category));
        this.props.dispatch(selectOrderBy(this.props.orderby))
        this.props.dispatch(getPosts(category, this.props.orderby));
    }

    componentWillReceiveProps(nextProps) {
        const newCategory = nextProps.match.params.category
        if((this.props.category !== newCategory) || this.props.orderby !== nextProps.orderby) {
            this.props.dispatch(selectCategory(newCategory))
            this.props.dispatch(getPosts(newCategory, nextProps.orderby));
        }
        
    }


  

    render() {
        const { classes, categories, posts, category, orderby } = this.props 
        return (

            <Paper className={classes.paper}>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 8, flex:1}}>
                        <OrderBy currentOrderby={orderby}/>
                    </div>

                    <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                        SELECT FILTER
                        <Category key='all' currentCategory='all' name='everything' path={'/'} />

                        {categories.map((item) => (
                            <Category key={item.path} currentCategory={category} name={item.name} path={item.path} />
                        ))}
                    </Typography>
                </div>
               
                <NewPost />
                <PostList posts={posts} category={category}/>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    if(state.posts.listPosts === undefined) {
        state.posts.listPosts = []
    }
    //const arrayListPosts = Object.keys(state.posts.listPosts).map(id => state.posts.listPosts[id]) 
    const posts = orderByLists(state.currentMenu.orderby, _.values(state.posts.listPosts))
    return {
      categories: state.categories,
      posts,
      category: state.currentMenu.category,
      orderby: state.currentMenu.orderby
    }
  }


export default compose(
    withStyles(styles, {
      name: 'CategoryPosts',
    }),
    withRouter,
    connect(mapStateToProps)
  )(CategoryPosts);