import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { newComment } from '../../modules/actions/posts'





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
        backgroundColor:'#F4F4F4',
        marginBottom: 16
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

class NewComment extends Component {

    handleChange = name => event => {
        this.setState({
            newComment: { ...this.state.newComment, [name]: event.target.value, }
        });
    };

    addPost = (comment) => {
        console.log(this.state.newComment)
        this.props.dispatch(newComment(comment))
        this.setState({
            newComment: {
                ...this.state.newComment,
                body: '',
                author: 'flpegomes',
            }
        })
    }

    
    _verifyFields = (countBody) => {
        if(countBody < 300 ){
            if(countBody >= 0) {
                return false     
            } else {
                return true
            }
        } else {
            return true
        }
    }
    
    state = {
        newComment: {
            body: '',
            author: 'flpegomes', 
            parentId: this.props.parentId
        },
        isEditing: false

    };
    render() {
        const { classes } = this.props   
        const { body } = this.state.newComment
        const { newComment } = this.state
        const countBody = 300 - body.length;
        
        return (                
            <form className={classes.container} noValidate autoComplete="off">
                <Card raised={false} className={classes.card} elevation={0}>                         
                    <CardContent>
                        <div style={{margin: 16}}>
                            <Typography variant='h6' component="div" className={classes.subtitle}>
                                        NEW COMMENT
                            </Typography>
                            <div style={{flexWrap: 'wrap', display: 'flex'}}>
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
                                    disabled={this._verifyFields(countBody)}
                                    onClick={() => this.addPost(newComment)}
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
      name: 'NewComment',
    }),
    connect()
  )(NewComment);