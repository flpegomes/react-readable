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
import { updatePostVote, editPost, deletePost } from '../../modules/actions/posts';
import { Link } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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
    }, 
    button: {
        marginTop: 16,
        elevation: 0,
        marginLeft: 8
    }
    
}

class Post extends Component {

    /**
     *  método para voto em postagem
     */
    handleVote = (id, vote) => {
        this.props.dispatch(updatePostVote(id, vote))
    }
    
    state = {
        anchorEl: null,
    };

    handleDelete = postId => {
        this.props.dispatch(deletePost(postId))
        this.setState({ ...this.state, isEditing: false, anchorEl: null });
    };

    handleClick = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    handleCancelEdit = () => {
        this.setState({ ...this.state, isEditing: false, anchorEl: null });
    };

    handleChange = name => event => {
        this.setState({
            contentPost: { ...this.state.contentPost, [name]: event.target.value }
        });
    };

    handleEdit = (post) => {
        this.setState({ 
            isEditing: true,
            anchorEl: null,
            contentPost: {
                title: post.title,
                body: post.body
            }
        });
    };
    
    state = {
        isEditing: false,
        anchorEl: null,
        contentPost : {
            title: '',
            body: ''
        }
    }
    editPost = (postId, content) => {
        this.props.dispatch(editPost(postId, content))
        this.setState({ ...this.state, isEditing: false, anchorEl: null });
    }

    _verifyFields = (countTitle, countBody) => {
        if(countTitle < 50 && countBody < 300 ){
            if(countTitle >= 0 && countBody >= 0) {
                return false  
            } else {
                return true
            }
        } else {
            return true
        }
    }

    render() {
        
        const { classes, post } = this.props   
        const { anchorEl, isEditing, contentPost } = this.state;
        const { title, body } = this.state.contentPost
        const countBody = 300 - body.length
        const countTitle = 50 - title.length
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
                                    <MoreVertIcon
                                        aria-owns={anchorEl ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleClick}
                                    />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={() => this.handleEdit(post)}>Edit</MenuItem>
                                    <MenuItem onClick={() => this.handleDelete(post.id)}>Delete</MenuItem>
                                </Menu>
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
                    {isEditing ? (
                        <form>
                        <CardContent>
                            <div style={{margin: 16}}>
                                <div style={{flexWrap: 'wrap', display: 'flex'}}>
                                
                                    <TextField
                                        id="standard-name"
                                        label="Enter a title for your post"
                                        className={classes.textField}
                                        value={title}
                                        onChange={this.handleChange('title')}
                                        margin="normal"
                                        variant="filled"
                                        helperText={(
                                            <span className={classes.root}>
                                                <span className={classes.grow}>
                                                </span>
                                                <span>
                                                    {countTitle < 20 ? (
                                                        <span style={{color:'#ff0000'}}>
                                                            {countTitle}
                                                        </span>
                                                    ) 
                                                    :(
                                                        <span>
                                                            {countTitle}
                                                        </span>
                                                    )}
                                                
                                                </span>
                                            </span>
                                            
                                        )}
                                        error={countTitle < 0 ? true : false}
                                        
                                    />

                                    <TextField
                                        id="standard-body"
                                        label="type your post"
                                        placeholder="write anything here..."
                                        onChange={this.handleChange('body')}
                                        value={body}
                                        margin="normal"
                                        variant="filled"
                                        fullWidth
                                        multiline
                                        rowsMax="4"
                                        rows="2"
                                        helperText={(
                                            <span className={classes.root}>
                                                <span className={classes.grow}>
                                                </span>
                                                <span>
                                                    {countBody < 20 ? (
                                                        <span style={{color:'#ff0000'}}>
                                                            {countBody}
                                                        </span>
                                                    ) 
                                                    :(
                                                        <span>
                                                            {countBody}
                                                        </span>
                                                    )}
                                                
                                                </span>
                                            </span>
                                            
                                        )}
                                        
                                        error={countBody < 0 ? true : false}
                                    />

                                   <div style={{display: 'flex', flex:1 }}>
                                            <div style={{marginLeft: 'auto'}}>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                className={classes.button} 
                                                onClick={() => this.handleCancelEdit()}
                                            >
                                                CANCEL
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                className={classes.button} 
                                                disabled={this._verifyFields(countTitle, countBody)}
                                                onClick={() => this.editPost(post.id, contentPost)}
                                            >
                                                SEND
                                            </Button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                            
                        </CardContent>
                        </form>
                    ) : ( 
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
                    )}
                        
                    
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