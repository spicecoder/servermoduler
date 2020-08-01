import React, {useState} from 'react';
import apis from '../api-client'

const AddFruitForm = props => { 
    const initialFruit = { name: '', quantity:'', price: '' }
	const [ fruit, setFruit ] = useState(initialFruit)

	const handleInputChange = event => {
		const { name, value } = event.target
		setFruit({ ...fruit, [name]: value })
    }

    const insertFruitApi = async (fruit) => {
        await apis.insertFruit(fruit).then(res => {
          props.addSuccess(fruit);
        });
    };

    return <div style={{padding: "10px", border: "1px solid green"}}>
        <h4>Add a new fruit!</h4>
        <form onSubmit={e =>{ 
            e.preventDefault(); 
            if (!fruit.name || !fruit.quantity || !fruit.price) return
            insertFruitApi(fruit);
			setFruit(initialFruit);
        }}>
        Fruit: <input type="text" name="name" value={fruit.name} onChange={handleInputChange} />
        Quanity: <input type="number" name="quantity" value={fruit.quantity} onChange={handleInputChange} /> 
        Price: <input type="text" name="price" value={fruit.price} onChange={handleInputChange} /> 
            <button type="submit" className="btn btn-primary btn-sm">Add Item</button>
        </form>
      </div>;
};
 
export default AddFruitForm;