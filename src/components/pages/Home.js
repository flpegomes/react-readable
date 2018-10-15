import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
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
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';




const styles = {
    paper: {
      flexGrow: 1,
      marginLeft: 320,
      marginRight: 320,
      marginTop: 32,
      padding:32
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
    },
      grow: {
        flexGrow: 1,
    },
    
}

class Home extends Component {
    state = {
        multiline: '',
    };
    

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };
    
    render() {
        
        const { classes } = this.props   
        const { multiline } = this.state
        const count = 300 - multiline.length   ;
        return (
            <Paper className={classes.paper}>
                <Chip
                    label="everything"
                    //onClick={handleClick}
                    className={classes.chip}
                    color="primary"
                />
                <Chip
                    label="react"
                    //onClick={handleClick}
                    className={classes.chip}
                />
                <Chip
                    label="redux"
                    //onClick={handleClick}
                    className={classes.chip}
                />
                <Chip
                    label="udacity"
                    //onClick={handleClick}
                    className={classes.chip}
                />
                <Card raised={false} className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            F
                            </Avatar>
                        }
                        action={
                            <div>
                                <Chip
                                    label="react"
                                    className={classes.chip}
                                    color='primary'
                                />
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                                </div>
                        }
                        title="@flpegomes"
                        subheader="September 14, 2016"
                    />
                        
                    <CardContent>
                        <Typography variant='h6' component="p">
                            Impressive paella 
                        </Typography>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Responder"
                                multiline
                                rowsMax="4"
                                value={multiline}
                                onChange={this.handleChange('multiline')}
                                className={classes.textField}
                                margin="dense"
                                helperText={(
                                    <div className={classes.root}>
                                    <span className={classes.grow}>responder post de @flpegomes</span>
                                    <span style={{color:'#ff0000'}} className={classes.grow}>
                                        {count}
                                    </span>
                                        
                                    </div>
                                    
                                )}
                                variant="outlined"
                                fullWidth
                                maxLength={300}
                            />  
                        </form>

                        <Button variant="contained" color="primary" className={classes.button}>
                        Enviar
                        </Button>
                    </CardActions>
                </Card>

                

            </Paper>
        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'Home',
    })
  )(Home);