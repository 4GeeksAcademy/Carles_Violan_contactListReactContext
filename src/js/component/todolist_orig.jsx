
import React, { useEffect, useState } from 'react';



const ToDoListOrig = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [followers, setfollowers]= useState(0);


//funcion nueva followers
function handleFollowClick(){
  setfollowers(followers +1);
}

//funcion Fetch

  
//cogemos el valor del del current item
  const handleInput = e => {
    setCurrentItem(e.target.value);
  };

  const addItem = e => {
    if (e.key === 'Enter' && currentItem !== '') {
//spread operator ...
      setItems([...items, currentItem]);
      setCurrentItem('');
      console.log(items);
    };

  };

  function eliminarElemento(value){
    const result = items.filter((element,index) => index !== value);
    setItems(result);
  }

  let numberItems = items.length;
    
  return (
    <div>
      <div className='container'>
        <h1 className='title'>ToDoList</h1>     
          <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">Items</span>
              <input type="text"  value={currentItem} onChange={handleInput} onKeyPress={addItem} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
          </div>      
      <ul className="list-group">
        {items.map((item, index) => (                             
             <li key={index} className="list-group-item">{item}<span className="badge" onClick={() => eliminarElemento(index)}>X</span></li>
        ))}
      </ul>
      <div className='countItems'>{numberItems}   item left</div><br></br>
      <button type='button' className='btn btn-primary' onClick={handleFollowClick}>followers</button>
      <div>{followers}</div>          
      
    </div>
    </div>
  )
    
  };

export default ToDoListOrig;