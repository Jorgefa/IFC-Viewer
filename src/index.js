import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import Test from "./tools/TestFile"

// Importing the Bootstrap CSS
//import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
console.log("Hello, index.js is working");
Test();