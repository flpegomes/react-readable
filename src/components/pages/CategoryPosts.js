import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PostList from '../post/PostList'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import { getCategories } from '../../modules/actions/categories'
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import { withRouter } from 'react-router-dom'
import { getPosts } from '../../modules/actions/posts';


const styles = {
    paper: {
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
      padding:32,
      maxWidth: 1000
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
                <div style={{marginBottom: 8}}>
                <OrderBy currentOrderby={orderby}/>
                </div>
                <Category key='all' currentCategory='all' name='everything' path={'/'} />

                {categories.map((item) => (
                    <Category key={item.path} currentCategory={category} name={item.name} path={item.path} />
                ))}
                
                <PostList posts={posts} category={category}/>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    if(state.posts.listPosts == undefined) {
        state.posts.listPosts = []
    }
    const arrayListPosts = Object.keys(state.posts.listPosts).map(id => state.posts.listPosts[id])   
    return {
      categories: state.categories,
      posts: arrayListPosts,
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