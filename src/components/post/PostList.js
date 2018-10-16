import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
//import { connect } from 'react-redux'
import { compose } from 'redux'
import Post from './Post'






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

class PostList extends Component {

    render() {
        const { posts } = this.props;
        console.log(posts)
        if(posts) {
            return (        
                <div>
                    {posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
                    
            )
        } else {
            return (
                <div> </div>
            )
            
        }
        
    }
}

export default compose(
    withStyles(styles, {
      name: 'PostList',
    })
  )(PostList);