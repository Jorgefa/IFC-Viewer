import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import createCanvas from "./tools/IfcApp"

console.log("Hello, index.js is working");

ReactDOM.render(<App />, document.getElementById('root'));


createCanvas();