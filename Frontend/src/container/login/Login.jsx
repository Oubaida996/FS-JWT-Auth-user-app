import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './login.css';
import axios from '../../api/axios';
import { Buffer } from 'buffer';

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {}, [email, pwd]);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedBase64Token = Buffer.from(`${email}:${pwd}`).toString(
        'base64'
      );

      const authorization = `Basic ${encodedBase64Token}`;
      const response = await axios.get('/signin', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
        withCredentials: true,
      });
      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
    console.table({ email, pwd });
    setSuccess(true);
  };

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
          <form
            className='jwt__login-form  px-8 pt-6 pb-8 '
            onSubmit={handleSubmit}>
            <Input
              htmlFor='email'
              label='Email'
              placeholder='Email'
              onChangeFun={(e) => setEmail(e.target.value)}
              refTo={emailRef}
              type='text'
            />
            <Input
              htmlFor='pwd'
              label='Password'
              placeholder='Password'
              onChangeFun={(e) => setPwd(e.target.value)}
              type='password'
            />
            <div className='flex flex-col justify-between items-start '>
              <button
                type='submit'
                className='bg-blue-500  w-1/2 text-zinc-100 font-bold text-lg px-3 py-2 mb-2 cursor-pointer rounded hover:bg-blue-600'>
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
