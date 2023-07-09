import React, { useState } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import Loading from '../../components/loading';
function Main() {
  const [loading, setLoading] = useState(false);

  return (
    <div className='jwt__main min-h-[500px] relative overflow-hidden  p-4 bg-blue-400 shadow-md rounded'>
      <input type='checkbox' className='hidden peer/chk' id='chk' />
      <Login setLoading={setLoading} />
      <Register setLoading={setLoading} />
      {loading && <Loading />}
    </div>
  );
}

export default Main;
