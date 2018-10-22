import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { formatDate, formatAvatar } from '../../utils/helpers'
import { updateCommentVote } from '../../modules/actions/posts';







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
    card: {
        marginTop: 0,
        backgroundColor:'#f4f4f4',
        borderRadius: 0,
        elevation: 0,
    },
    avatar: {
        backgroundColor: '#0277bd',
    },
    container: {
        display: 'flex',
        flex:1,
    },
    root: {
        flexGrow: 1,
        display: 'flex'
    },
      grow: {
        flexGrow: 1,
    },
    actions: {
        display: 'flex',
        flexGrow: 1,
    },
    subtitle: {
        fontSize: 12,
        color: '#aaa'
    },
    title: {
        fontSize: 16,
        color: '#444'
    }
    
}

class Comment extends Component {

    handleVote = (id, vote) => {
        this.props.dispatch(updateCommentVote(id, vote))
    }
    
    render() {
        
        const { classes, post } = this.props   
        return (                
                <Card raised={false} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            {formatAvatar(post.author)}
                            </Avatar>
                        }
                        action={
                            <div>
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                        }
                        title={
                                <Typography variant='h6' component="p" className={classes.title}>
                                    @{post.author}
                                </Typography>
                            }
                        subheader={
                                <Typography variant='subtitle1' component="p" className={classes.subtitle}>
                                    {formatDate(post.timestamp)}
                                </Typography>
                            }
                    />
                        <CardContent>
                            <Typography variant='h6' component="p">
                                {post.title}
                            </Typography>
                            <Typography variant='subtitle1' component="p">
                                {post.body}
                            </Typography>
                        </CardContent>
                        
                    
                    <CardActions className={classes.actions}>
                        <div className={classes.grow}>
                            <IconButton aria-label="like" onClick={() => this.handleVote(post.id, 'upVote')}>
                                <ThumbUp  />
                            </IconButton>
                            <span style={{color:'#444', fontSize:12}}>{post.voteScore}</span>
                            <IconButton aria-label="dislike" onClick={() => this.handleVote(post.id, 'downVote')}>
                                <ThumbDown />
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'Comment',
    }),
    connect()
  )(Comment);