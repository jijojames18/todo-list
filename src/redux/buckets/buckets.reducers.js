import BUCKET_ACTION_CONSTANTS from './buckets.constants';

const INITIAL_STATE = {
    'buckets': [],
    'isLoading': true,
    'error': null
};

const bucketsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUCKET_ACTION_CONSTANTS.ADD_BUCKET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                buckets: [action.payload, ...state.buckets]
            };
        case BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                buckets: action.payload
            };
        case BUCKET_ACTION_CONSTANTS.ADD_BUCKET_FAILURE:
        case BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default bucketsReducer;