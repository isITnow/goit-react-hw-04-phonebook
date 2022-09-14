import PropTypes from 'prop-types';
import { ContactsItem } from '././ContactsItem';
import s from './ContactsList.module.css';

export const ContactsList = ({ contacts, onDelete }) => {
  if (!contacts.length) {
    return <p>User not found</p>;
  }

  return (
    <ul className={s.contacts__list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactsItem
            key={id}
            name={name}
            number={number}
            id={id}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
