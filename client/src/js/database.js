import { openDB } from 'idb'; // imports the openDB function from idb, which is used to open the IndexedDB database

const initdb = async () => // creates the database if it doesn't exist
  // open the database
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return; // if the database already exists, do nothing
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true }); // creates the 'jate' object store in the database, with the keyPath 'id' and autoIncrement set to true
      console.log('jate database created'); // logs that the database was created
    },
  });

export const putDb = async (content) => console.error('putDb not implemented'); // putDB is from database.js, it adds content to the database.

export const getDb = async () => console.error('getDb not implemented'); 
// getDB is from database.js, it gets all the content from the database and returns it as a promise that resolves to a string, 
// which is the content of the database, or an empty string if the database is empty, or an error if something goes wrong.

initdb(); // calls the initdb function, which creates the database if it doesn't exist
