import { useState, useEffect } from "react";
import { Contact } from "../types/Contact";

export const useContactsStorage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const storedContacts = loadContactsFromStorage();
    setContacts(storedContacts);
  }, []);

  const saveContacts = (contacts: Contact[]) => {
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const loadContactsFromStorage = (): Contact[] => {
    const storedContacts = sessionStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  };

  return { contacts, setContacts, saveContacts };
};
