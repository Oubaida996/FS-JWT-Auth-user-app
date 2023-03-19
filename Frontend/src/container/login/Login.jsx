import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './login.css';
import AxiosInstance from '../../api/AxiosInstance';
import base64 from 'base-64';

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

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  useEffect(() => {
    // when the success state change to another value, the alert is displayed for 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const encodedBase64Token = base64.encode(`${email}:${pwd}`);

    const authorization = `Basic ${encodedBase64Token}`;
    try {
      AxiosInstance.post(
        '/signin',
        {},
        {
          headers: {
            Authorization: authorization,
          },
          withCredentials: true,
        }
      ).then((e) => console.log(1111111111, e));

      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 407) {
        setErrMsg('Missing email or password');
      } else if (err.response?.status === 400) {
        setErrMsg(`You don't have authenticate`);
      } else {
        setErrMsg(`Login Failed`);
      }
      errRef.current.focus();
    }
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
