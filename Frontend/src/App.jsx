import React, { useEffect, useState } from 'react';
import Login from './container/login/Login';
import Main from './container/main/Main';
import Register from './container/register/Register';

function App() {
  return (
    <div className='jwt__app  h-screen w-screen flex justify-center  items-center'>
    <Main/>
    </div>
  );
}

export default App;
