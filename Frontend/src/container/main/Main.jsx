import React from 'react';
import Login from '../login/Login';
import Register from '../register/Register';

function Main() {
  return (
    <div className='jwt__main  h-[460px] overflow-y-hidden bg-blue-400 shadow-md rounded'>
      <input type="checkbox" className='hidden peer/chk' id='chk' />
      <Login />
      <Register />
    </div>
  );
}

export default Main;
