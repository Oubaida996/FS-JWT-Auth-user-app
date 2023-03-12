import React from 'react';
import Input from '../../components/Input';
import './register.css';

function Register() {
  return (
    <div className='jwt__register '>
      <form className='jwt__register-form bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <Input forHtml='email' label='Email' placeholder='Email' />
        <Input forHtml='pwd' label='Password' placeholder='Password' />
        <Input
          forHtml='confirmPwd'
          label='Confirm password'
          placeholder='Confirm password'
        />
        <button className='bg-blue-500  text-zinc-100 font-bold text-lg px-3 py-2 rounded hover:bg-blue-600'>Sign up</button>
      </form>
    </div>
  );
}

export default Register;
