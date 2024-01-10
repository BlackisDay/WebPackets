// Import methods to save and get data from the indexedDB database in './database.js'
  
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content'); //gets content from local storage using key 'content' and sets it to localData

    // check if CodeMirror is loaded

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', //sets value to whatever is stored in indexeddb
      mode: 'javascript', //javascript mode
      theme: 'monokai', //monokai theme
      lineNumbers: true, //shows line numbers
      lineWrapping: true,  //wraps lines
      autofocus: true, //autofocus
      indentUnit: 2, //indent unit is 2 spaces
      tabSize: 2, //tab size is 2 spaces
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor'); 
      this.editor.setValue(data || localData || header); //sets value to whatever is stored in indexeddb
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue()); //sets value to whatever is stored in indexeddb
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => { //when the editor loses focus
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content')); //puts content from local storage using key 'content' into indexeddb, putDB is from database.js
    });
  }
}
