import {takeLatest, put, all, call} from 'redux-saga/effects';
import axios from 'axios';

import BUCKET_ACTION_CONSTANTS from './buckets.constants';
import {fetchBucketsSuccess, fetchBucketsFailure, addBucketFailure, addBucketSuccess} from './buckets.actions';

export function* fetchBucketsStart() {
    try {
        const response = yield axios.get(`${process.env.REACT_APP_API_ENDPOINT}/buckets`);
        yield put(fetchBucketsSuccess(response.data));
    } catch (error) {
        yield put(fetchBucketsFailure('Unable to fetch the list of buckets'));
    }
}

export function* onFetchBucketsStart() {
    yield takeLatest(BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_START, fetchBucketsStart)
}

export function* addBucketStart(action) {
    try {
        const request = {
            bucket: action.payload
        };
        yield axios.post(`${process.env.REACT_APP_API_ENDPOINT}/bucket`, request);
        yield put(addBucketSuccess(action.payload));
    } catch (error) {
        yield put(addBucketFailure('Unable to add new buckets'));
    }
}

export function* onAddBucketStart() {
    yield takeLatest(BUCKET_ACTION_CONSTANTS.ADD_BUCKET_START, addBucketStart)
}

export function* bucketsSagas() {
    yield all(
        [
            call(onFetchBucketsStart),
            call(onAddBucketStart)
        ]
    )
;}  