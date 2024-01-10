import { Workbox } from 'workbox-window'; // import the Workbox class, which is used to register service workers
import Editor from './editor'; // import the Editor class
import './database'; // import the database.js file
import '../css/style.css'; // import the CSS file

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `; // innerHTML property sets the HTML content of an element, as a string, or as an HTML DOM object, depending on the type of input, e.g. an <img> element, or a <div> element
  main.appendChild(spinner);// appends the spinner element to the main element
};

const editor = new Editor(); // creates an instance of the Editor class

if (typeof editor === 'undefined') {
  loadSpinner();
} else {
  editor.load();
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
