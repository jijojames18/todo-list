import {createSelector} from 'reselect';

const selectTodos = state => state.todos;

export const selectTodosIsLoading = createSelector(
    [selectTodos],
    (todos) => todos.isLoading
);

export const selectTodosList = createSelector(
    [selectTodos],
    (todos) => todos.todos
);

export const selectBucketName = createSelector(
    [selectTodos],
    (todos) => todos.bucketName
);

export const selectErrorMessage = createSelector(
    [selectTodos],
    (todos) => todos.error
);
