import React, {memo, useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import {deleteTodoStart, updateTodoStart} from '../../redux/todos/todos.actions';

import './todo-list-item.styles.scss';

const TodoListItem = ({todo, deleteTodoStart, updateTodoStart}) => {
    const {todoName, todoId} = todo;

    const [isInEdit, setIsInEdit] = useState(false);
    const [todoNewName, setTodoNewName] = useState(todoName);

    const updateTodo = () => {
        updateTodoStart({
            ...todo,
            todoDone: parseInt(todo.todoDone) ? 0 : 1
        });
    };

    const editTodo = () => {
        if (isInEdit) {
            setIsInEdit(false);
            updateTodoStart({
                ...todo,
                todoName: todoNewName
            });
        } else {
            setIsInEdit(true);
        }
    };

    const handleChange = (evt) => {
        const {value} = evt.target;
        setTodoNewName(value);
    };

    return (
        <div className="todo-item">
            {
                isInEdit ?
                    <FormInput type='text' name="itemName" value={todoNewName} handleChange={handleChange} required/>
                    :
                    <div className={`todo-name button ${parseInt(todo.todoDone) ? 'done' : ''}`} onClick={updateTodo}>
                        {todoName}
                    </div>
            }
            <div
                className={`edit-button button ${parseInt(todo.todoDone) ? 'hidden' : ''} ${isInEdit ? 'is-editing' : ''}`}
                onClick={editTodo}>&#9999;</div>
            {
                isInEdit ?
                    ''
                    :
                    <div className="remove-button button" onClick={() => deleteTodoStart(todoId)}>&#10005;</div>
            }
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteTodoStart: (todoId) => dispatch(deleteTodoStart(todoId)),
    updateTodoStart: (todo) => dispatch(updateTodoStart(todo))
});

export default memo(connect(null, mapDispatchToProps)(TodoListItem));