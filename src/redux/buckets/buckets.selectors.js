import {createSelector} from 'reselect';

const selectBuckets = state => state.buckets;

export const selectBucketsIsLoading = createSelector(
    [selectBuckets],
    (buckets) => buckets.isLoading
);

export const selectBucketsList = createSelector(
    [selectBuckets],
    (buckets) => buckets.buckets
);

export const selectBucketError = createSelector(
    [selectBuckets],
    (buckets) => buckets.error
);