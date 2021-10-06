import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Select_online_station from './pages/Select_online_station';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Select_online_station} />
        </Switch>
    </Router>
);

export default Routes;