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
    chip: {
        marginRight: 16
    },
    subtitle: {
        fontSize: 12,
        color: '#aaa',
        flex: 1,
        textAlign: 'right'
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
                
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 8, flex:1}}>
                        <OrderBy currentOrderby={orderby}/>
                    </div>

                    <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                        SELECT FILTER
                        <Category key='all' currentCategory='everything' name='everything' path={'/'} />

                        {categories.map((item) => (
                            <Category key={item.path} name={item.name} path={item.path} />
                        ))}
                    </Typography>
                </div>
                <NewPost />

                <PostList posts={posts} />
                
                
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