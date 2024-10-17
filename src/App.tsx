import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Contact } from "./types/Contact";
import useSnackbarNotification from "./hooks/useSnackbarNotification";

function App() {
  const { SnackbarNotification, showNotification } = useSnackbarNotification();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    if (editingContact) {
      const updatedContacts = contacts.map((contact) => (contact.id === editingContact.id ? { ...editingContact, ...newContact } : contact));
      setContacts(updatedContacts);
      setEditingContact(null);
      showNotification("Contact edited successfully!", "info");
    } else {
      const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
      const contactWithId: Contact = { ...newContact, id: newId };
      setContacts([...contacts, contactWithId]);
      showNotification("Contact added successfully!", "success");
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    showNotification("Contact deleted successfully!", "error");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management App
      </Typography>
      <AddContact onAddContact={handleAddContact} editingContact={editingContact} />{" "}
      <ContactList contacts={contacts} onEditContact={handleEditContact} onDeleteContact={handleDeleteContact} /> <SnackbarNotification />
    </Container>
  );
}

export default App;
