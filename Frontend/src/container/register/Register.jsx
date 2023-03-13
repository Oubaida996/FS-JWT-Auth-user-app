import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './register.css';

//=====Validate Input
//It can Contain a-z , A-Z characters and 0-9 numbers, you can add hyphone and under score
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//One a small character and one capital character and one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
