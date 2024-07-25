// src/js/component/contactlist.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from "../../img/contactIcon.jpg";


const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/CarlesViolan/contacts";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', address: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
 

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      if (Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      fetchContacts();
      setNewContact({ name: '', phone: '', email: '', address: '' });
     
    } catch (error) {
      setError(error);
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      fetchContacts();
    } catch (error) {
      setError(error);
      console.error('Error deleting contact:', error);
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/update/${id}`);
  };


  return (
    <div>
      <div className='container'>
              <h1>Contact List</h1>
              <form className="form-inline">
                
                  <div className="form-group">
                    <label for="text">Name:</label>
                    <input type="text" value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="form-control" id="text" placeholder="Enter text" name="name"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Phone:</label>
                    <input type="text" value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="form-control" id="text" placeholder="Enter Phone" name="phone"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Email:</label>
                    <input type="text" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="form-control" id="email" placeholder="Enter Email" name="email"/>
                  </div>
                  <div className="form-group">
                    <label for="text">Address:</label>
                    <input type="text" value={newContact.address}  onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                    className="form-control" id="address" placeholder="Enter Address" name="address"/>
                  </div>
                  <br></br>
                <button className="btn btn-primary" onClick={addContact}>Submit</button>

            </form>
          

         {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </div>
      <br></br>
      <div className='container'>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            
        <div className="card mb-3" style={{maxwidth: '540px'}}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={icon} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                  <h5 className="card-title">Id:{contact.id}</h5>
                    <h4 className="card-title">Name: {contact.name}</h4>
                    <p className="card-text">Phone: {contact.phone} {contact.email}</p>
                    <p className="card-text"><small className="text-body-secondary">Address: {contact.address}</small></p>
                    <button className="btn btn-warning" onClick={() => navigateToUpdate(contact.id)} style={{ marginRight: '10px' }}>Edit</button>
                    <button className="btn btn-success" onClick={() => deleteContact(contact.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ContactList;
