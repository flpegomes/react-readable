import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

//utils
import _ from 'lodash'
import { orderByLists } from '../../utils/helpers'

//components
import PostList from '../post/PostList'
import Category from '../menu/Category'
import OrderBy from '../menu/OrderBy'
import NewPost from '../post/NewPost'

//modules
import { getCategories } from '../../modules/actions/categories'
import { selectCategory, selectOrderBy } from '../../modules/actions/menu'
import { getPosts } from '../../modules/actions/posts'

//material-ui
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'



const styles = {
    paper: {
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 32,
      padding:32,
      maxWidth: 1000
    },    
    subtitle: {
        fontSize: 12,
        color: '#aaa',
        flex: 1,
        textAlign: 'right'
    },

}

class Home extends Component {
    
    componentDidMount() {

        //traz as categorias do banco de dados
        this.props.dispatch(getCategories());

        //muda a categoria para 'everything'
        this.props.dispatch(selectCategory('all'))

        //muda a ordenação no estado da aplicação
        this.props.dispatch(selectOrderBy(this.props.orderby))

        //Traz todas as postagens do servidor
        this.props.dispatch(getPosts('all', this.props.orderby ))
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.orderby !== nextProps.orderby) {
            this.props.dispatch(getPosts('all', nextProps.orderby ))
        }
    }
    
    render() {
        
        const { classes, categories, posts, orderby } = this.props  
        return (
            <Paper className={classes.paper}>
                
                <div style={{display:'flex'}}>
                    <div style={{marginBottom: 8, flex:1}}>
                        <OrderBy currentOrderby={orderby}/>
                    </div>

                    <Typography variant='subtitle1' component="div" className={classes.subtitle}>
                        SELECT FILTER

                        {/* Adicionamos 'na mão' a categoria everything, já que ela nao existe no servidor e logo após um .map para
                            renderizar todas as categorias cadastradas. */}
                        <Category key='all' currentCategory='everything' name='everything' path={'/'} />

                        {categories.map((item) => (
                            <Category key={item.path} name={item.name} path={item.path} />
                        ))}
                    </Typography>
                </div>
                <NewPost />

                <PostList posts={posts} />
                
                
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    
    //usado para a primeira renderização
    if(state.posts.listPosts === undefined) {
         state.posts.listPosts = []
    }

    //Uso do lodash para transformar o objeto em array e depois ordena-lo de acordo com a opção de ordenação atual
    const posts = orderByLists(state.currentMenu.orderby, _.values(state.posts.listPosts))

    return {
      categories: state.categories,
      posts,
      orderby: state.currentMenu.orderby
    }
  }
  

export default compose(
    withStyles(styles, {
      name: 'Home',
    }),
    withRouter,
    connect(mapStateToProps)
  )(Home);