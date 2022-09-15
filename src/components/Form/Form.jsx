import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './Form.module.css';

export const Form = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = evt => {
    const { name } = evt.currentTarget;
    const { value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const profile = { id: nanoid(3), name, number };

    onFormSubmit(profile);
    formReset();
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <label className="form__name">
        Name
        <input
          className={s.form__input}
          value={name}
          onChange={handleInputChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className="form__phone">
        Number
        <input
          className={s.form__input}
          value={number}
          onChange={handleInputChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={s.form__btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
