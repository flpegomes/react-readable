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
        marginLeft: 8,
        marginRight: 8
    },
    card: {
        marginTop: 16,
        backgroundColor:'#f4f4f4'
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
        marginLeft: 16,
        marginRight: 16,
        width: 500,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 16
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
          [name]: event.target.value,
        });
      };
    

    state = {
        name: '',
        body: ''
    };
    render() {
        
        const { classes } = this.props   
        return (                
            <form className={classes.container} noValidate autoComplete="off">
                <Card raised={false} className={classes.card}>
                    <CardHeader
                        // avatar={
                        //     <Avatar aria-label="Recipe" className={classes.avatar}>
                        //     N
                        //     </Avatar>
                        // }

                        title={
                            <Typography variant='h6' component="p" className={classes.title}>
                                NEW POST
                            </Typography>
                        }

                    />
                        
                    <CardContent>
                        <div style={{flexWrap: 'wrap', display: 'flex'}}>
                            <TextField
                                id="standard-name"
                                label="Enter a title for your post"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                variant="filled"
                                
                            />

                            <div className={classes.selectCategory}>
                                <Typography variant='subtitle1' component="p" className={classes.subtitle}>
                                    SELECT CATEGORY 
                                    <Chip
                                        label='react'
                                        className={classes.chip}
                                        color='default'
                                    />
                                    <Chip
                                        label='redux'
                                        className={classes.chip}
                                        color='default'
                                    />
                                    <Chip
                                        label='udacity'
                                        className={classes.chip}
                                        color='default'
                                    />
                                </Typography>
                            </div>

                            <TextField
                                id="standard-body"
                                label="type your post"
                                placeholder="write anything here..."
                                style={{ margin: 16 }}
                                value={this.state.body}
                                onChange={this.handleChange('body')}
                                margin="normal"
                                variant="filled"
                                fullWidth
                                multiline
                                rowsMax="4"
                                rows="2"
                            />

                            <Button variant="outlined" color="primary" className={classes.button}>
                                SEND
                            </Button>
                        </div>
                        
                    </CardContent>
                    <CardActions className={classes.actions}>
                        
                    </CardActions>
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