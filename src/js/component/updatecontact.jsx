// src/js/component/updatecontact.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactList from '../component/contactlist.jsx';



const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/CarlesViolan/contacts";

const UpdateContact = () => {
  const { id } = useParams();
  const { name } = useParams();

  
  const [contact, setContact] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        // const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setContact(data);
    } catch (error) {
      setError(error);
      console.error('Error fetching contact:', error);
    }
  };

  const updateContact = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      navigate('/');
    } catch (error) {
      setError(error);
      console.error('Error updating contact:', error);
    }
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <div className='container'>
      {/* <h1>Update Contact { id }</h1> */}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <h1>Edit Contact number: { id }</h1>
      
              <form className="form-inline">
                
                  <div className="form-group">
                    <label for="text">Name:</label>
                    <input type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="form-control" id="text" placeholder="Enter text" name="name"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Phone:</label>
                    <input type="text" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="form-control" id="text" placeholder="Enter Phone" name="phone"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Email:</label>
                    <input type="text" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="form-control" id="email" placeholder="Enter Email" name="email"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Address:</label>
                    <input type="text" value={contact.address}  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    className="form-control" id="address" placeholder="Enter Address" name="address"/>
                  </div>
                  <br></br>
                {/* <button class="btn btn-primary" onClick={<ContactList />}>Submit</button> */}
               
            </form>
            
            <button className="btn btn-primary" onClick={updateContact}>Update Contact</button>
       
      </div>
      

  );
};

export default UpdateContact;
