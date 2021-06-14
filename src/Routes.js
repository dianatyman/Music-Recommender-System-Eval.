import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import CollabFiltering from "./CFiltering/CollabFiltering";
import CBased from "./CBased/CBased";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/CBased" component={CBased} />
                    <Route path="/CollabFiltering" component={CollabFiltering} />
                    
                </Switch>
            </Router>
        )
    }
}

// <Route path="/" exact component={Home} />
// <Route path="/CBased" component={CBased} />