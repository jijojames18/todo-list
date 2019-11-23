import {createSelector} from 'reselect';

const selectTodos = state => state.todos;

export const selectTodosIsLoading = createSelector(
    [selectTodos],
    (todos) => todos.isLoading
);

export const selectPendingTodosList = createSelector(
    [selectTodos],
    (todos) => todos.todos.filter((todo) => parseInt(todo.todoDone) === 0)
);

export const selectDoneTodosList = createSelector(
    [selectTodos],
    (todos) => todos.todos.filter((todo) => parseInt(todo.todoDone) === 1)
);

export const selectBucketName = createSelector(
    [selectTodos],
    (todos) => todos.bucketName
);

export const selectErrorMessage = createSelector(
    [selectTodos],
    (todos) => todos.error
);
