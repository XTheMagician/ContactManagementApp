import React, { useState, useMemo } from "react";
import { Container, Typography, Switch, CssBaseline, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { Contact } from "./types/Contact";
import useSnackbarNotification from "./hooks/useSnackbarNotification";
import { useContactsStorage } from "./hooks/useContactsStorage";

function App() {
  const { SnackbarNotification, showNotification } = useSnackbarNotification();
  const { contacts, setContacts, saveContacts } = useContactsStorage();
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const initialDarkMode = sessionStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  //Sets the darkmode depending on the current value of the switch
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isDarkMode = event.target.checked;
    setDarkMode(isDarkMode);
    sessionStorage.setItem("darkMode", String(isDarkMode));
  };

  //useMemo to avoid constant recalculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          my={2}
        >
          <Typography variant="h4">Contact Management App</Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography>Darkmode</Typography>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              inputProps={{ "aria-label": "theme toggle" }}
            />
          </Box>
        </Box>
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
    </ThemeProvider>
  );
}

export default App;
