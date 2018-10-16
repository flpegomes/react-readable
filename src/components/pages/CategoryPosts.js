import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import PostList from '../post/PostList'
import Category from '../menu/Category'
import { getCategories, selectCategory } from '../../modules/actions/categories'
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
        this.props.dispatch(getPosts(category));
    }

    componentWillReceiveProps(nextProps) {
        const changeCategory = nextProps.match.params.category
        if(this.props.category !== changeCategory) {
            this.props.dispatch(selectCategory(changeCategory))
            this.props.dispatch(getPosts(changeCategory));

        }
    }


  

    render() {
        const { classes, categories, posts, category } = this.props   
        return (
            <Paper className={classes.paper}>
                <Category key='all' currentCategory='all' name='everything' path={'/'} />

                {categories.map((item) => (
                    <Category key={item.path} currentCategory={category} name={item.name} path={item.path} />
                ))}
                
                <PostList posts={posts} category={category}/>
            </Paper>
        )
    }
}

function mapStateToProps({categories, posts, currentMenu}) {
    return {
      categories,
      posts,
      category: currentMenu.category  
    }
  }


export default compose(
    withStyles(styles, {
      name: 'CategoryPosts',
    }),
    withRouter,
    connect(mapStateToProps)
  )(CategoryPosts);