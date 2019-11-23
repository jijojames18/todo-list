import React from 'react';
import {Switch, Route} from 'react-router-dom';

import BucketsListContainer from './components/buckets-list/buckets-list.component';
import TodosListContainer from './components/todos-list/todos-list.component';

import './App.css';

const App = () => {
    return (
        <div className="todos-list-app">
            <Switch>
                <Route exact path="/" component={BucketsListContainer}/>
                <Route exact path="/bucket/:id" component={TodosListContainer}/>
            </Switch>
        </div>
    );
}

export default App;