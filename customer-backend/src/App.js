import React from 'react';
// import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import './styles.css'

function App() {
  return (
    <>
    <h1 className='main-heading'>Customer Management System</h1>
      <div className="App">
        <CustomerList />
      </div>
    </>
  );
}

export default App;
