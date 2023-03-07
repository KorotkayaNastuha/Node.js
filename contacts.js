const fs = require('fs').promises
const { v4: uuidv4 } = require("uuid");
const path = require('path')


const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contactByID = parsedContacts.find(
      (contact) => contact.id === contactId.toString()
    );

    console.log(contactByID);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactsAfterRemove = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );

    console.table(contactsAfterRemove);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAfterRemove),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    let parsedContacts = JSON.parse(contacts);

    const newContact = {
      //   id: parsedContacts.length + 1,
      id: uuidv4(),
      name: name.toString(),
      email: email.toString(),
      phone: phone.toString(),
    };
    parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");

    console.log(`Contact added: ${newContact.name}`);
    console.table(parsedContacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}