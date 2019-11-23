import React from 'react';
import {withRouter} from 'react-router-dom';

import './bucket-item.styles.scss';

const BucketItem = ({bucket, history}) => {
    const {bucketName, bucketId} = bucket;

    return (
        <div className="bucket-item" onClick={() => {
            history.push(`/bucket/${bucketId}/`)
        }}>
            <div className="bucket-item-name">{bucketName}</div>
        </div>
    );
};

export default withRouter(BucketItem);