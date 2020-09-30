import React, {Component} from 'react';
import Layout from "./containers/Layout/Layout";
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout/>
                </Router>
            </Provider>
        );
    }
}

export default App;