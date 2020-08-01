import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FruitList from './components/list-component';
import EditFruitForm from './components/update-component';
import AddFruitForm from './components/add-component';
import apiClient from './api-client'

function App() {
  const initialEditForm = {id:0, name:'', price:'', updated: false};

  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState(initialEditForm);
  
  useEffect(() => {
    getAllFruitsApi();
  }, []);

  const getAllFruitsApi = async () => {
    const result = await apiClient.getAllFruits();
    setList(result.data);
  };

  //--------------------------------------

  const showSuccess = message => {
    window.alert(message); 
    getAllFruitsApi();
  };
  
  return (
    <div>
      <h2>CRUD Fruit App</h2>
      { editing ?
        (<EditFruitForm updateSuccess={() => showSuccess("Fruit updated successfully")}
          selectedFruit={selectedFruit}
          setEditing={setEditing} ></EditFruitForm>):
        (<AddFruitForm addSuccess={() => showSuccess("Fruit added successfully")} ></AddFruitForm>)
      }
      <FruitList list={list} 
        deleteSuccess={() => showSuccess("Fruit deleted successfully")}
        editFruit={(item) =>{setEditing(true); setSelectedFruit(item)}}></FruitList>
    </div>
  );
}

export default App;
