import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'

//components
import Post from '../post/Post'
import Comment from '../post/Comment'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import NewComment from '../post/NewComment'

//modules
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import { withRouter } from 'react-router-dom'
import { getPostDetail } from '../../modules/actions/posts'
import { getCategories } from '../../modules/actions/categories'

//utils
import { orderByLists } from '../../utils/helpers'
import _ from 'lodash'

//material-ui
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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

class PostDetail extends Component {
    
    componentDidMount() {
        const category = this.props.match.params.category
        const postId = this.props.match.params.post_id
        this.props.dispatch(getCategories());
        this.props.dispatch(selectCategory(category));
        this.props.dispatch(selectOrderBy('hot'))
        this.props.dispatch(getPostDetail(postId)) 
    }

    componentWillReceiveProps(nextProps) {
        const newCategory = nextProps.match.params.category
        const postId = this.props.match.params.post_id

        if((this.props.category !== newCategory) || this.props.orderby !== nextProps.orderby) {
            this.props.dispatch(selectCategory(newCategory))
            this.props.dispatch(getPostDetail(postId));
        }
        
    }


  

    render() {
        const { classes, categories, post, category, orderby, comments } = this.props 
        if(post.id === undefined) {
            console.log('a')
        }
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
                {post !== undefined && (
                    <div>
                        <Post post={post} />
                        <NewComment parentId={this.props.parentId} />
                        {comments.map((reply, i) => 
                            <Comment 
                                key={reply.id} 
                                comment={reply}                         
                            />
                        )}
                    </div>
                )}
                
                

                
                
            </Paper>
        )
    }
}

function mapStateToProps(state, params) {
    const parentId = params.match.params.post_id
    if(state.posts.post === undefined) {
        state.posts.post = []
    } 
    const comments = orderByLists(state.currentMenu.orderby, _.values(state.posts.post.replies))
    
    return {
      parentId,
      categories: state.categories,
      post: state.posts.post,
      comments,
      category: state.currentMenu.category,
      orderby: state.currentMenu.orderby
    }
  }


export default compose(
    withStyles(styles, {
      name: 'PostDetail',
    }),
    withRouter,
    connect(mapStateToProps)
  )(PostDetail);