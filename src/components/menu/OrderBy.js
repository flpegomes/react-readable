import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router-dom'
import Whatshot from '@material-ui/icons/Whatshot';
import FiberNew from '@material-ui/icons/FiberNew';
import { selectOrderBy } from '../../modules/actions/menu';
import { connect } from 'react-redux'




const styles = {
    chip: {
        marginRight: 16,
        paddingLeft: 8,
        paddingRight: 8
    },

}

class OrderBy extends Component {

    handleClick = (orderby) => {
        this.props.dispatch(selectOrderBy(orderby))
    }

    render() {
        
        const { classes, currentOrderby } = this.props   
        console.log(currentOrderby)
        return (
            <span>
                <Chip
                    icon={<Whatshot />}
                    label='hot'
                    onClick={() => this.handleClick('hot')}
                    className={classes.chip}
                    color={currentOrderby === 'hot' ? 'secondary' : 'default'}
                />

                <Chip
                    icon={<FiberNew />}
                    label='new'
                    onClick={() => this.handleClick('new')}
                    className={classes.chip}
                    color={currentOrderby === 'new' ? 'secondary' : 'default'}
                />
            </span>


        )
    }
}



export default compose(
    withStyles(styles, {
      name: 'OrderBy',
    }),
    withRouter,
    connect()
  )(OrderBy);