import React from 'react';
import './App.css';
import Test from './components/Test';
import ReactDatePicker from './components/myreactdatepicker/ReactDatePicker';

function App() {
  return (
    <div className="App">
      <div className="column left">
        <ReactDatePicker />
      </div>
      <div className="column middle">
        <Test />
      </div>
    </div>
  );
}

export default App;
