import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management App
      </Typography>
      <ContactList contacts={contacts} />
    </Container>
  );
}

export default App;
