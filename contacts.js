const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contactData = await fs.readFile(contactsPath);
  const contactList = JSON.parse(contactData);
  return contactList;
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const contactById = contactList.find((el) => el.id === contactId.toString());
  return contactById;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const contactToDelete = await getContactById(contactId);

  if (!contactToDelete) {
    return null;
  }

  const newContactList = contactList.filter(
    (el) => el.id !== contactId.toString()
  );

  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));

  return contactToDelete;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const id = (Math.max(...contactList.map((el) => el.id)) + 1).toString();
  const contactToAdd = { id, name, email, phone };
  contactList.push(contactToAdd);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

  return contactToAdd;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
