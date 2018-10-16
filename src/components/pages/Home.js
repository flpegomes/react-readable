import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PostList from '../post/PostList'
import Category from '../menu/Category'
import { getCategories } from '../../modules/actions/categories'
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

class Home extends Component {
    
    componentDidMount() {
        this.props.dispatch(getCategories());
        this.props.dispatch(getPosts('all'))
    }
    
    render() {
        
        const { classes, categories, posts } = this.props   
        return (
            <Paper className={classes.paper}>

                <Category key='all' currentCategory='everything' name='everything' path={'/'} />

                {categories.map((item) => (
                    <Category key={item.path} name={item.name} path={item.path} />
                ))}
                
                <PostList posts={posts}/>
            </Paper>
        )
    }
}

function mapStateToProps({categories, posts}) {
    return {
      categories,
      posts,
    }
  }
  

export default compose(
    withStyles(styles, {
      name: 'Home',
    }),
    withRouter,
    connect(mapStateToProps)
  )(Home);