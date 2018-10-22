import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { formatDate, formatAvatar } from '../../utils/helpers'
import { updatePostVote } from '../../modules/actions/posts';
import { Link } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea';







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
        marginTop: 16,
        backgroundColor:'#f4f4f4'
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

class Post extends Component {

    handleVote = (id, vote) => {
        this.props.dispatch(updatePostVote(id, vote))
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
                                <Chip
                                    label={post.category}
                                    className={classes.chip}
                                    color='primary'
                                />
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
                    <CardActionArea
                        component={Link}
                        to={`/${post.category}/${post.id}`}
                    >
                        
                        <CardContent>
                            <Typography variant='h6' component="p">
                                {post.title}
                            </Typography>
                            <Typography variant='subtitle1' component="p">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                        
                    
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
                        <span style={{color:'#444', fontSize:12}}>{post.commentCount}</span>

                        <IconButton aria-label="Comments">
                            <QuestionAnswer />
                        </IconButton>
                        
                    </CardActions>
                </Card>
        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'Post',
    }),
    connect()
  )(Post);