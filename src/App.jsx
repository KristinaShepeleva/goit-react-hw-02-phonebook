import { Component } from "react";
import { nanoid } from "nanoid";

import Container from 'components/Container/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    }
    
    else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(({ prevContacts }) => ({
      contacts: prevContacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = evn => {
  
  this.setState({ filter: evn.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;
   
    const filterValue = filter.toUpperCase();
    const visibleContacts = contacts.filter(element =>
      element.name.toUpperCase().includes(filterValue)
    );

    return (
      <Container>
        <h1>Phonebook</h1> 
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        { contacts.length > 1 && (<Filter value={filter} onChange={this.handleFilter} />)}
        {contacts.length > 0 ? (
      
        <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          /> 
        ): (<p>Your phonebook is empty.</p>)}
        
    </Container>
  )
}


}


export default App;
