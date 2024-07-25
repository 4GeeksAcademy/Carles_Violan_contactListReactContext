// src/js/component/contactlist.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "https://playground.4geeks.com/contact/agendas/CarlesViolan/contacts";

const ViewList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', address: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


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
      <h1>Contact List</h1>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <div>
        {/* <input
          type="text"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          value={newContact.address}
          onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
          placeholder="Address"
        /> */}
        <button onClick={addContact}>Add Contact</button>
      </div>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p>{contact.address}</p>
            <button onClick={() => navigateToUpdate(contact.id)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
            <input
          type="text"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          type="email"
          value={contact.email}
         onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="Email"
        />
        <input
          type="text"
          value={contact.address}
         onChange={(e) => setContact({ ...contact, address: e.target.value })}
          placeholder="Address"
        />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewList;
