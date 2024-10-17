import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Contact } from "./types/Contact";
import useSnackbarNotification from "./hooks/useSnackbarNotification";

function App() {
  const { SnackbarNotification, showNotification } = useSnackbarNotification();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    const storedContacts = getContacts();
    setContacts(storedContacts);
  }, []);

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    if (editingContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === editingContact.id
          ? { ...editingContact, ...newContact }
          : contact
      );
      setContacts(updatedContacts);
      setEditingContact(null);
      saveContacts(updatedContacts);
      showNotification("Contact edited successfully!", "info");
    } else {
      const newId =
        contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
      const contactWithId: Contact = { ...newContact, id: newId };
      setContacts([...contacts, contactWithId]);
      saveContacts([...contacts, contactWithId]);
      showNotification("Contact added successfully!", "success");
    }
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

  const saveContacts = (contacts: Contact[]) => {
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const getContacts = (): Contact[] => {
    const storedContacts = sessionStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management App
      </Typography>
      <AddContact
        onAddContact={handleAddContact}
        editingContact={editingContact}
      />{" "}
      <ContactList
        contacts={contacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />{" "}
      <SnackbarNotification />
    </Container>
  );
}

export default App;
