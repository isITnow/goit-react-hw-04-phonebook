import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from './Form';
import { ContactsList } from './ContactsList';
import { Filter } from './Filter';

const CONTACTS_LOCALSTORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(CONTACTS_LOCALSTORAGE_KEY)) ?? [];
  });
  const [filter, stFilter] = useState('');

  const handleFormSubmit = profile => {
    const nameToCheck = profile.name.toLocaleLowerCase();
    const isIncludeName = contacts.some(
      contact => contact.name.toLocaleLowerCase() === nameToCheck
    );
    if (isIncludeName) {
      toast.warn(`${profile.name} is already in contacts`, { autoClose: 2000 });
      return;
    }
    setContacts(prevState => [profile, ...prevState]);
  };

  const handleFilterChange = evt => {
    const { value } = evt.currentTarget;
    stFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedContacts = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedContacts)
    );
  };

  const handleDeleteContact = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const filteredContacts = getFilteredContacts();

  useEffect(() => {
    localStorage.setItem(CONTACTS_LOCALSTORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Form onFormSubmit={handleFormSubmit} />
      <h2 className="contacts__title">Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactsList
        contacts={filteredContacts}
        onDelete={handleDeleteContact}
      />
      <ToastContainer />
    </div>
  );
};
