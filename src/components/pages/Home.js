import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PostList from '../post/PostList'
import { getCategories } from '../../modules/actions/categories'
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import NewPost from '../post/NewPost'
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
    chip: {
        marginRight: 16
    },

}

class Home extends Component {
    
    componentDidMount() {
        this.props.dispatch(getCategories());
        this.props.dispatch(selectCategory('all'));
        this.props.dispatch(selectOrderBy(this.props.orderby))
        this.props.dispatch(getPosts('all', this.props.orderby ))
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.orderby !== nextProps.orderby) {
            this.props.dispatch(getPosts('all', nextProps.orderby ))
        }
        
    }
    
    render() {
        
        const { classes, categories, posts, orderby } = this.props  
        return (
            <Paper className={classes.paper}>
                
                <div style={{marginBottom: 8, marginTop: 8 }}>
                    <OrderBy currentOrderby={orderby}/>
                </div>
                <div>
                    <Category key='all' currentCategory='everything' name='everything' path={'/'} />

                    {categories.map((item) => (
                        <Category key={item.path} name={item.name} path={item.path} />
                    ))}
                </div>
                <NewPost />

                <PostList posts={posts} />
                
                
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
      orderby: state.currentMenu.orderby
    }
  }
  

export default compose(
    withStyles(styles, {
      name: 'Home',
    }),
    withRouter,
    connect(mapStateToProps)
  )(Home);