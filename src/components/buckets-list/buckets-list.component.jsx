import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import BucketItem from '../bucket-item/bucket-item.component';
import AddItemContainer from '../add-item/add-item.component';
import WithSpinner from '../with-spinner/with-spinner.component';
import {selectBucketsIsLoading, selectBucketsList, selectBucketError} from '../../redux/buckets/buckets.selectors';
import {fetchBucketsStart} from '../../redux/buckets/buckets.actions';

import './buckets-list.styles.scss';

const HomePage = ({buckets, errorMessage}) => {
    return (
        <div className="buckets-list">
            <div className="add-item-container">
                <h3>My Buckets</h3>
                <AddItemContainer type="bucket"></AddItemContainer>
                {
                    errorMessage ?
                        <h4 class="error">{errorMessage}</h4>
                        :
                        ''
                }
            </div>
            <div className="buckets">
                {
                    buckets.map(bucket => (<BucketItem key={bucket.bucketId} bucket={bucket}/>))
                }
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    buckets: selectBucketsList,
    isLoading: selectBucketsIsLoading,
    errorMessage: selectBucketError
});

const mapDispatchToProps = dispatch => ({
    initiateFetch: () => dispatch(fetchBucketsStart())
});

const HomePageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(HomePage);

export default HomePageContainer;