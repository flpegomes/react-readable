import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Post from '../post/Post'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import { withRouter } from 'react-router-dom'
import { getPostDetail, getPostComments } from '../../modules/actions/posts';
import { getCategories } from '../../modules/actions/categories'

import Typography from '@material-ui/core/Typography';
import _ from 'lodash'



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
        this.props.dispatch(selectOrderBy(this.props.orderby))
        this.props.dispatch(getPostDetail(postId)) 
        this.props.dispatch(getPostComments(postId))
    }

    componentWillReceiveProps(nextProps) {
        const newCategory = nextProps.match.params.category
        if((this.props.category !== newCategory) || this.props.orderby !== nextProps.orderby) {
            this.props.dispatch(selectCategory(newCategory))
            //this.props.dispatch(getPostDetail(postId));
        }
        
    }


  

    render() {
        const { classes, categories, post, category, orderby } = this.props 
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
                    <Post post={post} />                
                )}
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    
    return {
      categories: state.categories,
      post: state.posts.post,
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