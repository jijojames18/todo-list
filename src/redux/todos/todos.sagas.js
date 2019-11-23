import {takeLatest, put, all, call} from 'redux-saga/effects';
import axios from 'axios';

import TODO_ACTION_CONSTANTS from './todos.constants';
import {
    fetchTodosSuccess,
    fetchTodosFailure,
    modifyTodoFailure,
    modifyTodoSuccess,
    deleteTodoFailure,
    deleteTodoSuccess
} from './todos.actions';

export function* fetchTodosStart(action) {
    try {
        const response = yield axios.get(`${process.env.REACT_APP_API_ENDPOINT}/todos/${action.payload}`);
        yield put(fetchTodosSuccess(response.data));
    } catch (error) {
        yield put(fetchTodosFailure(error.message));
    }
};

export function* onFetchTodosStart() {
    yield takeLatest(TODO_ACTION_CONSTANTS.FETCH_TODOS_START, fetchTodosStart)
};

export function* updateTodoStart(action) {
    try {
        const request = {
            todo: action.payload
        };
        yield axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/todo`, request);
        yield put(modifyTodoSuccess(action.payload));
    } catch (error) {
        yield put(modifyTodoFailure('Unable to update todo'));
    }
};

export function* onUpdateTodoStart() {
    yield takeLatest(TODO_ACTION_CONSTANTS.UPDATE_TODO_START, updateTodoStart)
};

export function* deleteTodoStart(action) {
    try {
        yield axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/todo/${action.payload}`);
        yield put(deleteTodoSuccess(action.payload));
    } catch (e) {
        yield put(deleteTodoFailure('Unable to delete todo'));
    }
};

export function* onDeleteTodoStart() {
    yield takeLatest(TODO_ACTION_CONSTANTS.DELETE_TODO_START, deleteTodoStart)
};

export function* addTodoStart(action) {
    try {
        const request = {
            todo: action.payload
        };
        yield axios.post(`${process.env.REACT_APP_API_ENDPOINT}/todo`, request);
        yield put(modifyTodoSuccess(action.payload));
    } catch (error) {
        yield put(modifyTodoFailure('Unable to add todo'));
    }
};

export function* onAddTodoStart() {
    yield takeLatest(TODO_ACTION_CONSTANTS.ADD_TODO_START, addTodoStart)
};

export function* todosSagas() {
    yield all(
        [
            call(onFetchTodosStart),
            call(onDeleteTodoStart),
            call(onUpdateTodoStart),
            call(onAddTodoStart)
        ]
    )
};