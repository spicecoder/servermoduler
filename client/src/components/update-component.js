import React, {useState} from 'react';
import apis from '../api-client'

const EditFruitForm = props => { 
	const [ fruit, setFruit ] = useState(props.selectedFruit)

	const handleInputChange = event => {
		const { name, value } = event.target
        setFruit({ ...fruit, [name]: value });
    }

    const updateFruitApi = async (fruit) => {
        let updatedFruit = {name:fruit.name, price: fruit.price, quantity: fruit.quantity};
        await apis.updateFruitById(props.selectedFruit._id, updatedFruit).then(res => {
          props.updateSuccess();
          props.setEditing(false);
        });
    };

    return <div style={{padding: "10px", border: "1px solid red"}}>
        <h4>Edit fruit</h4>
         <form onSubmit={e =>{ 
            e.preventDefault(); 
            if (!fruit.name || !fruit.quantity || !fruit.price) return
            updateFruitApi(fruit);
        }}>
        Fruit: <input type="text" name="name" value={fruit.name} onChange={handleInputChange} />
        Quanity: <input type="number" name="quantity" value={fruit.quantity} onChange={handleInputChange} /> 
        Price: <input type="text" name="price" value={fruit.price} onChange={handleInputChange} /> 
            <button type="submit" className="btn btn-primary btn-sm">Update Item</button>
            <button className="btn btn-secondary btn-sm" onClick={() => props.setEditing(false)}>Cancel</button>
        </form>
      </div>;
};
 
export default EditFruitForm;