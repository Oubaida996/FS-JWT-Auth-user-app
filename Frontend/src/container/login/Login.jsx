import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './login.css';
const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // emailRef.current.focus();
  },[]);

  return (
    <>
      {success ? (
        <section>
          <p className='w-full duration-1000 delay-1000 bg-green-400 text-slate-100 p-4'>
            You are logged in, you can sign in
          </p>
        </section>
      ) : (
        <section className='jwt__login flex flex-col justify-between  mb-4 w-full h-full '>
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
            {/* If the email and pwd are invalid */}
            <p
              ref={errRef}
              className={errMsg ? 'errmsg' : 'offscreen'}
              aria-live='assertive'>
              {errMsg}
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
