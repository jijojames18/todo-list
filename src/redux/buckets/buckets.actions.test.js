import {addBucketStart} from './buckets.actions';
import BUCKET_ACTION_CONSTANTS from './buckets.constants';

describe('addBucketStart action', () => {
    it('should create the addBucketStart action', () => {
        const mockBucketMap = {
            'bucketId': '1',
            'bucketName': 'Test 1'
        };

        const action = addBucketStart(mockBucketMap);

        expect(action.type).toEqual(BUCKET_ACTION_CONSTANTS.ADD_BUCKET_START);
        expect(action.payload).toEqual(mockBucketMap);
    });
});