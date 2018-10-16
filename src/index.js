import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './modules/reducers'
import middleware from './modules/middleware'

const store = createStore(reducer, middleware)
const theme = createMuiTheme({  
    palette: {
        primary: {
          light: '#58a5f0',
          main: '#0277bd',
          dark: '#004c8c',
          contrastText: '#fff',
        },
        secondary: {
          light: '#6d6d6d',
          main: '#424242',
          dark: '#1b1b1b',
          contrastText: '#fff',
        },
        typography: {
            useNextVariants: true
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>, 
document.getElementById('root'));