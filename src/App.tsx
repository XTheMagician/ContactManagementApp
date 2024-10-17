import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Contact } from "./types/Contact";
import useSnackbarNotification from "./hooks/useSnackbarNotification";
import { useContactsStorage } from "./hooks/useContactsStorage";

function App() {
  const { SnackbarNotification, showNotification } = useSnackbarNotification();
  const { contacts, setContacts, saveContacts } = useContactsStorage();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    if (editingContact) {
      handleEdit(newContact);
    } else {
      handleAddNewContact(newContact);
    }
  };

  const handleAddNewContact = (newContact: Omit<Contact, "id">) => {
    const newId =
      contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    const contactWithId: Contact = { ...newContact, id: newId };
    const updatedContacts = [...contacts, contactWithId];

    setContacts(updatedContacts);
    saveContacts(updatedContacts);
    showNotification("Contact added successfully!", "success");
  };

  const handleEdit = (updatedContact: Omit<Contact, "id">) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === editingContact?.id
        ? { ...editingContact, ...updatedContact }
        : contact
    );
    setContacts(updatedContacts);
    setEditingContact(null);
    saveContacts(updatedContacts);
    showNotification("Contact edited successfully!", "info");
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
    showNotification("Contact deleted successfully!", "error");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management App
      </Typography>
      <AddContact
        onAddContact={handleAddContact}
        editingContact={editingContact}
      />
      <ContactList
        contacts={contacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />
      <SnackbarNotification />
    </Container>
  );
}

export default App;
