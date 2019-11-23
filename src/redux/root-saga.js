import {all, call} from 'redux-saga/effects';

import {todosSagas} from './todos/todos.sagas';
import {bucketsSagas} from './buckets/buckets.sagas';

export default function* rootSaga() {
    yield all([
        call(todosSagas),
        call(bucketsSagas)
    ]);
};