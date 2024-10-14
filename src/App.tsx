import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Contact } from "./types/Contact"; // Import the Contact interface

function App() {
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

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    const newId =
      contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    const contactWithId: Contact = { ...newContact, id: newId };
    setContacts([...contacts, contactWithId]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management App
      </Typography>
      <AddContact onAddContact={handleAddContact} />
      <ContactList contacts={contacts} />
    </Container>
  );
}

export default App;
