import React, {useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {addBucketStart} from '../../redux/buckets/buckets.actions';
import {addTodoStart} from '../../redux/todos/todos.actions';
import {v4} from 'uuid';

import './add-item.styles.scss';

const AddItem = ({type, addBucket, addTodo, ...otherProps}) => {
    const [itemName, setItemName] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (type === 'bucket') {
            addBucket({
                'bucketId': v4(),
                'bucketName': itemName
            });
        } else {
            addTodo({
                'todoId': v4(),
                'todoName': itemName,
                'todoBucketId': otherProps.bucketId
            });
        }

        setItemName('');
    };

    const handleChange = (evt) => {
        const {value} = evt.target;
        setItemName(value);
    }

    return (
        <div className="add-item">
            <form className="add-item-form" onSubmit={handleSubmit}>
                <FormInput type='text' name="itemName" value={itemName} handleChange={handleChange} required/>
                <CustomButton type="submit">Add</CustomButton>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addBucket: (params) => dispatch(addBucketStart(params)),
    addTodo: (params) => dispatch(addTodoStart(params))
});

const AddItemContainer = compose(
    connect(null, mapDispatchToProps)
)(AddItem);

export default AddItemContainer;