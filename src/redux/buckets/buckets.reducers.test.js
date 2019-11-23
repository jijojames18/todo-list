import bucketsReducer from './buckets.reducers';
import BUCKET_ACTION_CONSTANTS from './buckets.constants';

describe('buckets reducer', () => {
    it('should return the initial state', () => {
        expect(bucketsReducer(undefined, {})).toEqual({
            "buckets": [],
            "error": null,
            "isLoading": true
        });
    });

    it('should return the state on fetch success', () => {
        const fetchBucketsSuccessData = {
            type: BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_SUCCESS,
            payload: [
                {
                    'todoId': 1,
                    'todoName': 'Test 1'
                }
            ]
        };
        expect(bucketsReducer(undefined, fetchBucketsSuccessData)).toEqual({
            "buckets": [
                {
                    'todoId': 1,
                    'todoName': 'Test 1'
                }
            ],
            "error": null,
            "isLoading": false
        });
    });

    it('should add the bucket success', () => {
        const addBucketsSuccessData = {
            type: BUCKET_ACTION_CONSTANTS.ADD_BUCKET_SUCCESS,
            payload:
                {
                    'todoId': 2,
                    'todoName': 'Test 2'
                }
        };
        const initialState = {
            buckets: [
                {
                    'todoId': 1,
                    'todoName': 'Test 1'
                }
            ],
            "error": null,
            "isLoading": false
        }

        expect(bucketsReducer(initialState, addBucketsSuccessData)).toEqual({
            "buckets": [
                {
                    'todoId': 2,
                    'todoName': 'Test 2'
                },
                {
                    'todoId': 1,
                    'todoName': 'Test 1'
                }
            ],
            "error": null,
            "isLoading": false
        });
    });


    it('should set error on fetch failure', () => {
        const fetchBucketsFailureData = {
            type: BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_FAILURE,
            payload: 'error'
        };

        expect(bucketsReducer(undefined, fetchBucketsFailureData)).toEqual({
            "buckets": [],
            "error": 'error',
            "isLoading": false
        });
    });
});