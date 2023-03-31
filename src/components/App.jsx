import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from '../redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './Container/Container';

export const App = () => {
  const contacts = useSelector(state => state.contacts.savedContacts);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const handleContactRemove = contactId => {
    dispatch(removeContact(contactId));
  };

  const formSubmitHandle = data => {
    const isContactRepeat = contacts.find(
      contact => contact.name === data.name
    );

    if (isContactRepeat) {
      alert(`${data.name} is alredy in contacts`);
      return;
    }

    dispatch(addContact(data.name, data.number));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.currentTarget.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();
  const visibleContactsLength = visibleContacts.length;
  const contactsLength = contacts.length;

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandle} />
      </Container>
      <Container>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        {contactsLength === 0 ? (
          <p>You have no contacts yet...</p>
        ) : visibleContactsLength === 0 ? (
          <p>No results in your contacts...</p>
        ) : (
          <ContactsList
            contacts={visibleContacts}
            onRemoveContact={handleContactRemove}
          />
        )}
      </Container>
    </>
  );
};
