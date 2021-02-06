import React, { Component } from 'react';
import Router from './Router';
import GlobalStyle from './GlobalSytles';

class App extends Component {
    render() {
        return (
            <>
                <Router />
                <GlobalStyle />
            </>
        );
    }
}
export default App;
