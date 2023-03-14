import React from 'react';
import Input from '../../components/Input';
import './login.css';

function Login() {
  return (
    <div className='jwt__login flex flex-col justify-between  mb-4 w-full h-full '>
      <label
        htmlFor='chk'
        className='block  mb-4 text-center text-white font-bold text-4xl duration-500 scale-100'>
        Log in
      </label>
      <form className='jwt__login-form  px-8 pt-6 pb-8 '>
        <Input htmlFor='email' label='Email' placeholder='Email' />
        <Input htmlFor='pwd' label='Password' placeholder='Password' />
        <div className='flex flex-col justify-between items-start '>
          <button className='bg-blue-500  w-1/2 text-zinc-100 font-bold text-lg px-3 py-2 mb-2 cursor-pointer rounded hover:bg-blue-600'>
            Log in
          </button>
          <p className='flex items-center cursor-pointer mb-4 text-slate-50 hover:text-slate-300'>
            Forget password?
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
