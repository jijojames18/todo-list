import {combineReducers} from 'redux';
import todosReducer from './todos/todos.reducers';
import bucketsReducer from './buckets/buckets.reducers';

const rootReducer = combineReducers({
    todos: todosReducer,
    buckets: bucketsReducer
});

export default rootReducer;