import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.resolve("src", "db", "./contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}

// (async () => {
//   const contacts = await listContacts();
//   console.log(contacts);
// })();

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}

// (async () => {
//   const contacts = await getContactById("AeHIrLTr6JkxGE6SN-0Rw");
//   console.log(contacts);
// })();

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      console.log(`Contact with ID: ${contactId} not found.`);
      return contacts;
    }

    contacts.splice(index, 1);
    return contacts;
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}

// (async () => {
//   const contacts = await removeContact("qdggE76Jtbfd9eWJHrssH");
//   console.log(contacts);
// })();

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    
    const existingContact = contacts.find(contact => contact.email === email);
    if (existingContact) {
      console.warn("This email is already in use!");
      return contacts;
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return updatedContacts;
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

// (async () => {
//   const contacts = await addContact("Alice", "alice@example.com", "123-456-7890");
//   console.log(contacts);
// })();

export { listContacts, getContactById, removeContact, addContact };