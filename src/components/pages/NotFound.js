import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'redux'

//components
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'

//modules
import { withRouter } from 'react-router-dom'
import { getCategories } from '../../modules/actions/categories'

//material-ui
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'


const styles = {
    paper: {
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
      padding:32,
      maxWidth: 1000
    },
    msg: {
        color: '#222',
        flex: 1,
        textAlign: 'center'
    },
    card: {
        marginTop: 16,
        backgroundColor:'#F4F4F4',
        marginBottom: 16
    },
}

class NotFound extends Component {
    
    componentDidMount() {
        this.props.dispatch(getCategories());
    }  

    render() {
        const { classes, categories, orderby, category } = this.props 
        return (

            <Paper className={classes.paper}>
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 8, flex:1}}>
                        <OrderBy currentOrderby={orderby}/>
                    </div>

                    <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                        SELECT FILTER
                        <Category key='all' currentCategory='all' name='everything' path={'/'} />

                        {categories.map((item) => (
                            <Category key={item.path} currentCategory={category} name={item.name} path={item.path} />
                        ))}
                    </Typography>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop: 24}}>
                    <Card raised={false} className={classes.card} elevation={0}> 
                        <CardContent>
                            <div style={{margin: 16}}>
                                <Typography variant='h6' component="div" className={classes.subtitle}>
                                    404 NOT FOUND - This post was not found or does not exist.
                                </Typography>
                            </div>  
                        </CardContent>
                    </Card>
                </div>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    
    return {
      categories: state.categories,
      category: state.currentMenu.category,
      orderby: state.currentMenu.orderby
    }
  }


export default compose(
    withStyles(styles, {
      name: 'NotFound',
    }),
    withRouter,
    connect(mapStateToProps)
  )(NotFound);