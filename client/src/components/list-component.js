import React from 'react';
import DeleteFruit from './delete-component'
const FruitList = props => { 
  return <div style={{border: "1px solid blue"}}>
            <table className="table table-sm table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {props.list.map((item, i) => (
            <tr key={i}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => props.editFruit(item)}>
                    Edit</button> 
                  <DeleteFruit selectedFruit={item} deleteSuccess={props.deleteSuccess}>
                    Delete</DeleteFruit>
                </td>                    
            </tr>
            ))}
            </tbody>
            </table>
  </div>;
};
 
export default FruitList;