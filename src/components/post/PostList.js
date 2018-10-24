import React, { Component } from 'react'

//component
import Post from './Post'

class PostList extends Component {

    render() {
        const { posts } = this.props;
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

export default (PostList);