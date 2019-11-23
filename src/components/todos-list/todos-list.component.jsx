import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import AddItemContainer from '../add-item/add-item.component';
import TodoListItem from '../todo-list-item/todo-list-item.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {fetchTodosStart} from '../../redux/todos/todos.actions';
import {
    selectTodosIsLoading,
    selectPendingTodosList,
    selectDoneTodosList,
    selectBucketName,
    selectErrorMessage
} from '../../redux/todos/todos.selectors';

import './todos-list.styles.scss';

const TodoList = ({pendingTodos, doneTodos, match, history, bucketName, errorMessage}) => {
    return (
        <div className="todos-list">
            <div className="add-item-container">
                <div className="header">
                    <div className="back-icon" onClick={() => history.push('/')}>&#8592;</div>
                    <h3 className="bucket-name">{bucketName}</h3>
                </div>
                <AddItemContainer type="todo" bucketId={match.params.id}/>
                {
                    errorMessage ?
                        <h4 className="error">{errorMessage}</h4>
                        :
                        ''
                }
            </div>
            <div className="todos">
                {
                    
                    pendingTodos.map(todo => {
                        return <TodoListItem key={todo.todoId} todo={todo}/>
                    })
                }
            </div>
            <div className="todos">
                {
                    doneTodos.map(todo => {
                        return <TodoListItem key={todo.todoId} todo={todo}/>
                    })
                }
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    pendingTodos: selectPendingTodosList,
    doneTodos: selectDoneTodosList,
    isLoading: selectTodosIsLoading,
    bucketName: selectBucketName,
    errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
    initiateFetch: (bucketId) => dispatch(fetchTodosStart(bucketId))
});

const TodoListContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(TodoList);

export default TodoListContainer;