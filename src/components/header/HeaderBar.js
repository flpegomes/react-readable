import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
}

class HeaderBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6' className={classes.grow} color="inherit">
                            READABLE 
                        </Typography>
                        <Button color='inherit'>
                            login
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'HeaderBar',
    })
  )(HeaderBar);