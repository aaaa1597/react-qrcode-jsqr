import React from 'react';
import './App.css';
import QRCodeScanner from './components/QRCodeScanner';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <QRCodeScanner />
      </header>
      hello world!!
    </div>
  );
}

export default App;
