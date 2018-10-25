import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//modules
import { selectOrderBy } from '../../modules/actions/menu'

//material-ui
import Typography from '@material-ui/core/Typography'
import Whatshot from '@material-ui/icons/Whatshot'
import FiberNew from '@material-ui/icons/FiberNew'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    chip: {
        marginLeft: 16,
        paddingLeft: 8,
        paddingRight: 8
    },    
    subtitle: {
        fontSize: 12,
        color: '#aaa'
    },

}

//componente que renderiza as opções de ordenação da aplicação
class OrderBy extends Component {

    handleClick = (orderby) => {
        this.props.dispatch(selectOrderBy(orderby))
    }

    render() {
        
        const { classes, currentOrderby } = this.props   
        return (
            <span>

                <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                    ORDER BY: 
                
                    <Chip
                        icon={<FiberNew />}
                        label='new'
                        onClick={() => this.handleClick('new')}
                        className={classes.chip}
                        color={currentOrderby === 'new' ? 'secondary' : 'default'}
                    />

                    <Chip
                        icon={<Whatshot />}
                        label='hot'
                        onClick={() => this.handleClick('hot')}
                        className={classes.chip}
                        color={currentOrderby === 'hot' ? 'secondary' : 'default'}
                    />
                </Typography>

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