import React from 'react';
import Input from '../../components/Input';
import './register.css';

function Register() {
  return (
    <div className='jwt__register flex flex-col   w-full h-full translate-y-[-32%] transition ease-in-out duration-500  peer-checked/chk:-translate-y-[85%] '>
      <form className='jwt__register-form  bg-white shadow-md rounded rounded-t-3xl px-8 pt-6 pb-8 mb-4 '>
        
        <label
          for='chk'
          className='block mb-8 text-center font-bold text-blue-400 text-4xl duration-500 scale-50 '>
          Register
        </label>
        <Input forHtml='email' label='Email' placeholder='Email' />
        <Input forHtml='pwd' label='Password' placeholder='Password' />
        <Input
          forHtml='confirmPwd'
          label='Confirm password'
          placeholder='Confirm password'
        />
        <div>
          <button className='bg-blue-500 w-1/2 text-zinc-100 font-bold text-lg px-3 py-2 rounded hover:bg-blue-600'>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
