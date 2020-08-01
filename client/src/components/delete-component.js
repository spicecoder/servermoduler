import React from 'react';
import apis from '../api-client'

const DeleteFruit = props => { 
    const deleteFruitApi = async (_id) => {
        await apis.deleteFruitById(_id).then(res => {
          props.deleteSuccess(true);
        });
    };

    const confirmDelete = () => {
        if(window.confirm(`Are you sure you want to delete ${props.selectedFruit.name}?`)){
            deleteFruitApi(props.selectedFruit._id);
          }
    };

    return <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
    Delete</button>;
};
 
export default DeleteFruit;