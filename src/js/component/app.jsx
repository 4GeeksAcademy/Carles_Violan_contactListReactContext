// src/js/component/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import '../styles/App.css';
import ContactList from '../component/contactlist.jsx';
import UpdateContact from '../component/updatecontact.jsx';
import viewList from '../component/viewlist.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/update/:id" element={<UpdateContact />} />
            
            {/* <Route path="/" element={<viewList />} /> */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
