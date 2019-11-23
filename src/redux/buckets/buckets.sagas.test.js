import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

import {fetchBucketsStart, onFetchBucketsStart} from "./buckets.sagas";
import BUCKET_ACTION_CONSTANTS from './buckets.constants';
import {fetchBucketsSuccess, fetchBucketsFailure} from './buckets.actions';

describe('fetch bucket start saga', () => {
    it('should trigger on FETCH_BUCKETS_START', () => {
      const generator = onFetchBucketsStart();
      expect(generator.next().value).toEqual(
        takeLatest(BUCKET_ACTION_CONSTANTS.FETCH_BUCKETS_START, fetchBucketsStart)
      );
    });
});

describe('fetch bucket async saga', () => {
    const generator = fetchBucketsStart();

    it('should call axios get', () => {
        const getBuckets = jest.spyOn(axios, 'get');
        generator.next();
        expect(getBuckets).toHaveBeenCalled();
    });

    it('should fire fetchBucketsSuccess if fetch succesful', () => {
        const mockResponse = {
            data: { 
              todos: [{}],
              bucketName: 'Test1'
            }
        };

        const expectedResponse = {
            todos: [{}],
            bucketName: 'Test1'
        };
    
        expect(generator.next(mockResponse).value).toEqual(
          put(fetchBucketsSuccess(expectedResponse))
        );
      });
    
    it('should fire fetchBucketsFailure if fetch fails', () => {
        const newGenerator = fetchBucketsStart();
        newGenerator.next();
        expect(newGenerator.throw({}).value).toEqual(
          put(fetchBucketsFailure('Unable to fetch the list of buckets'))
        );
      });
});