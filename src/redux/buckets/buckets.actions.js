import BUCKET_ACTION_CONSTANTS from './buckets.constants';

export const addBucketStart = (bucket) => {
    return {
        type: BUCKET_ACTION_CONSTANTS.ADD_BUCKET_START,
        payload: bucket
    }
};

export const addBucketSuccess = (bucket) => {
    return {
        type: BUCKET_ACTION_CONSTANTS.ADD_BUCKET_SUCCESS,
        payload: bucket
    }
};

export const addBucketFailure = (error) => {
    return {
        type: BUCKET_ACTION_CONSTANTS.ADD_BUCKET_FAILURE,
        payload: error
    }
};

export const fetchBucketsStart = () => {
    return {
        type: BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_START
    }
};

export const fetchBucketsSuccess = (buckets) => {
    return {
        type: BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_SUCCESS,
        payload: buckets
    }
};

export const fetchBucketsFailure = (error) => {
    return {
        type: BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_FAILURE,
        payload: error
    }
};