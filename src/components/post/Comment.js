import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

//utils and modules
import { formatDate, formatAvatar } from '../../utils/helpers'
import { updateCommentVote, deleteComment, editComment } from '../../modules/actions/posts'

//material-ui
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    card: {
        marginTop: 0,
        backgroundColor:'#f4f4f4',
        borderRadius: 0,
        elevation: 0,
    },
    avatar: {
        backgroundColor: '#0277bd',
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
    },
    
}

class Comment extends Component {

    //metodo usado no botão para o voto
    handleVote = (id, vote) => {
        this.props.dispatch(updateCommentVote(id, vote))
    }

    //usado para deletar o comentario, passando o id do comentario e o id do post e apos clicar o menu fecha
    handleDelete = (commentId, parentId) => {
        this.props.dispatch(deleteComment(commentId, parentId))
        this.setState({ ...this.state, anchorEl: null });
    };

    //libera a edição do comentário
    handleEdit = () => {
        this.setState({ ...this.state, isEditing: true, anchorEl: null });
    };

    //cancela a edição do comentário
    handleCancelEdit = () => {
        this.setState({ ...this.state, isEditing: false, anchorEl: null });
    };

    //usado para fechar o menu ao clicar em qualquer lugar
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    //abre o menu
    handleClick = event => {
        this.setState({ ...this.state, anchorEl: event.currentTarget });
    };

    //controle do textfield
    handleChange = name => event => {
        this.setState({
            contentComment: { ...this.state, [name]: event.target.value }
        });
    };

    //função usada no botão send para enviar o comentário editado
    editComment = (id, body) => {
        this.props.dispatch(editComment(id, body))
        this.setState({ ...this.state, isEditing: false, anchorEl: null });
    }

    //verifica o body com limite de 300 caracteres e com alguma coisa digitada
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
        //menu
        anchorEl: null,

        //habilitar o editor
        isEditing: false,

        //comentário
        contentComment: {
            body: this.props.comment.body
        }
    };
    
    render() {
        
        const { classes, comment, } = this.props 
        const { anchorEl, isEditing } = this.state
        const { body } = this.state.contentComment

        //count do tamanho do body
        const countBody = 300 - body.length
        return (               
                <Card raised={false} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            {formatAvatar(comment.author)}
                            </Avatar>
                        }
                        action={
                            <div>
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
                                    <MenuItem onClick={() => this.handleEdit()}>Edit</MenuItem>
                                    <MenuItem onClick={() => this.handleDelete(comment.id, comment.parentId)}>Delete</MenuItem>
                                </Menu>
                            </div>
                        }
                        title={
                                <Typography variant='h6' component="p" className={classes.title}>
                                    @{comment.author}
                                </Typography>
                            }
                        subheader={
                                <Typography variant='subtitle1' component="p" className={classes.subtitle}>
                                    {formatDate(comment.timestamp)}
                                </Typography>
                            }
                    />
                    {isEditing ? (
                                <form>
                                    <CardContent>
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
                                                            {/* se o body passar de 280 caracteres o 
                                                                contador dele fica vermelho na pagina */}
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
                                        <div style={{display: 'flex' }}>
                                            <div style={{marginLeft: 'auto'}}>
                                                <Button 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    className={classes.button} 
                                                    disabled={this._verifyFields(countBody)}
                                                    onClick={() => this.handleCancelEdit()}
                                                >
                                                    CANCEL
                                                </Button>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary" 
                                                    className={classes.button} 
                                                    disabled={this._verifyFields(countBody)}
                                                    onClick={() => this.editComment(comment.id, body)}
                                                >
                                                    SEND
                                                </Button>
                                            </div>
                                        </div>
                                </CardContent>
                            </form>

                    ) : (
                        <CardContent>
                            <Typography variant='subtitle1' component="p">
                                {comment.body}
                            </Typography>
                        </CardContent>
                    )}
                    

                    <CardActions className={classes.actions}>
                        <div className={classes.grow}>
                            <IconButton aria-label="like" onClick={() => this.handleVote(comment.id, 'upVote')}>
                                <ThumbUp  />
                            </IconButton>
                            <span style={{color:'#444', fontSize:12}}>{comment.voteScore}</span>
                            <IconButton aria-label="dislike" onClick={() => this.handleVote(comment.id, 'downVote')}>
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