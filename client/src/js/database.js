import { openDB } from 'idb'; // imports the openDB function from idb, which is used to open the IndexedDB database

const initdb = async () =>  // creates the database if it doesn't exist
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

export const putDb = async (id,content) =>{
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1); // open the database
  const tx = jateDb.transaction('jate', 'readwrite'); // start a transaction
  const store = tx.objectStore('jate'); // get the 'jate' object store
  const request = store.put({id: id,jate: content }); // put the content in the 'jate' object store
  const result = await request;
  console.log('data saved to the database', result); // get the result
};

export const getDb = async () =>{
  const jateDb = await openDB('jate', 1); // open the database
  const tx = jateDb.transaction('jate', 'readonly'); // start a transaction
  const store = tx.objectStore('jate'); // get the 'jate' object store
  const request = store.getAll(); // get all the content in the 'jate' object store
  const result = await request; // get the result
  return result?.jate || 'Database is empty'; // return the result 
};

// getDB is from database.js, it gets all the content from the database and returns it as a promise that resolves to a string, 
// which is the content of the database, or an empty string if the database is empty, or an error if something goes wrong.

initdb(); // calls the initdb function, which creates the database if it doesn't exist
