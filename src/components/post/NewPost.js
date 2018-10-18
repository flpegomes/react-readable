import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
//import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
//import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { newPost } from '../../modules/actions/posts'





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
        marginLeft: 8,
        marginRight: 8
    },
    card: {
        marginTop: 16,
        backgroundColor:'#F4F4F4'
    },
    avatar: {
        backgroundColor: '#0277bd',
    },
    container: {
        flexWrap: 'wrap',
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
        color: '#444',
        marginLeft: 16,
        marginTop: 8
    },
    textField: {
        width: 500,
    },
    button: {
        marginLeft: 'auto',
        marginTop: 16,
        elevation: 0
    },
    selectCategory: {
        marginRight: 16,
        marginLeft: 'auto',
        alignSelf: 'center'
    }
    
}

class NewPost extends Component {


    handleChange = name => event => {
        this.setState({
          newpost: { ...this.state.newpost, [name]: event.target.value, }
        });
    };

    handleCategory = category => {
        this.setState({
            newpost:{ ...this.state.newpost, category }
          });
    }

    addPost = post => {
        this.props.dispatch(newPost(post))
        this.setState({
            newpost: {
                title: '',
                body: '',
                category: '',
                author: 'flpegomes'
            }
        })


    }
    
    _verifyFields = (countTitle, countBody) => {
        if(countTitle < 50 && countBody < 300 ){
            if(countTitle >= 0 && countBody >= 0) {
                if(this.state.newpost.category !== '') {
                    return false
                }else {
                    return true
                }
                
            } else {
                return true
            }
        } else {
            return true
        }
    }

    state = {
        newpost: {
            title: '',
            body: '',
            category: '',
            author: 'flpegomes', 
        },

    };
    render() {
        const { classes } = this.props   
        const { title, body, category } = this.state.newpost
        const { newpost } = this.state
        const countBody = 300 - body.length;
        const countTitle = 50 - title.length
        return (                
            <form className={classes.container} noValidate autoComplete="off">
                <Card raised={false} className={classes.card} elevation={0}> 
                    {/* <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            N
                            </Avatar>
                        }

                        title={
                            <Typography variant='h6' component="p" className={classes.subtitle}>
                                NEW POST
                            </Typography>
                        }

                    /> */}
                        
                    <CardContent>
                        <div style={{margin: 16}}>
                            <Typography variant='h6' component="div" className={classes.subtitle}>
                                        NEW POST
                            </Typography>
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

                                <div className={classes.selectCategory}>
                                    <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                                        SELECT CATEGORY 
                                        <Chip
                                            label='react'
                                            className={classes.chip}
                                            color={category === 'react' ? 'primary' : 'default'}
                                            onClick={() => this.handleCategory('react')}
                                        />
                                        <Chip
                                            label='redux'
                                            className={classes.chip}
                                            color={category === 'redux' ? 'primary' : 'default'}
                                            onClick={() => this.handleCategory('redux')}
                                        />
                                        <Chip
                                            label='udacity'
                                            className={classes.chip}
                                            color={category === 'udacity' ? 'primary' : 'default'}
                                            onClick={() => this.handleCategory('udacity')}
                                        />
                                    </Typography>
                                </div>

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

                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button} 
                                    disabled={this._verifyFields(countTitle, countBody)}
                                    onClick={() => this.addPost(newpost)}
                                >
                                    SEND
                                </Button>
                            </div>
                        </div>
                        
                        
                    </CardContent>
                </Card>
            </form>
        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'NewPost',
    }),
    connect()
  )(NewPost);