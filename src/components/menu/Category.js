import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import Chip from '@material-ui/core/Chip';
import { Link, withRouter } from 'react-router-dom'




const styles = {
    chip: {
        marginRight: 16
    },

}

class Category extends Component {

    
    render() {
        
        const { classes, name, path, currentCategory } = this.props   
        return (
                <Chip
                    key={path}
                    label={name}
                    //onClick={handleClick}
                    className={classes.chip}
                    color="default"
                    component={Link}
                    to={`/category/${path}`}
                    color={currentCategory === name ? 'primary' : 'default'}
                />


        )
    }
}

export default compose(
    withStyles(styles, {
      name: 'Category',
    }),
    withRouter
  )(Category);