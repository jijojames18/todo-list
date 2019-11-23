import TODO_ACTION_CONSTANTS from './todos.constants';

export const updateTodoStart = (todo) => {
    return {
        type: TODO_ACTION_CONSTANTS.UPDATE_TODO_START,
        payload: todo
    }
};

export const addTodoStart = (todo) => {
    return {
        type: TODO_ACTION_CONSTANTS.ADD_TODO_START,
        payload: todo
    }
};

export const modifyTodoSuccess = (todo) => {
    return {
        type: TODO_ACTION_CONSTANTS.MODIFY_TODO_SUCCESS,
        payload: todo
    }
};

export const modifyTodoFailure = (error) => {
    return {
        type: TODO_ACTION_CONSTANTS.MODIFY_TODO_FAILURE,
        payload: error
    }
};

export const fetchTodosStart = (bucketId) => {
    return {
        type: TODO_ACTION_CONSTANTS.FETCH_TODOS_START,
        payload: bucketId
    }
};

export const fetchTodosSuccess = (todos) => {
    return {
        type: TODO_ACTION_CONSTANTS.FETCH_TODOS_SUCCESS,
        payload: todos
    }
};

export const fetchTodosFailure = (error) => {
    return {
        type: TODO_ACTION_CONSTANTS.FETCH_TODOS_FAILURE,
        payload: error
    }
};

export const deleteTodoStart = (todoId) => {
    return {
        type: TODO_ACTION_CONSTANTS.DELETE_TODO_START,
        payload: todoId
    }
};

export const deleteTodoSuccess = (todoId) => {
    return {
        type: TODO_ACTION_CONSTANTS.DELETE_TODO_SUCCESS,
        payload: todoId
    }
};

export const deleteTodoFailure = (error) => {
    return {
        type: TODO_ACTION_CONSTANTS.DELETE_TODO_FAILURE,
        payload: error
    }
};