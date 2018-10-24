import React, { Component } from 'react'
import { compose } from 'redux'
import { Link, withRouter } from 'react-router-dom'

//material-ui
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'





const styles = {
    chip: {
        marginLeft: 16
    },

}

class Category extends Component {
    
    
    render() {
        
        const { classes, name, path, currentCategory } = this.props   
        return (
            <span>
                <Chip
                    key={path}
                    label={name}
                    className={classes.chip}
                    component={Link}
                    to={path === '/' ? '/' : `/${path}`}
                    color={currentCategory === name ? 'primary' : 'default'}
                />
            </span>


        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'Category',
    }),
    withRouter
  )(Category);