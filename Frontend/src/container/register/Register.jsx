import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './register.css';

//=====Validate Input
//It can Contain a-z , A-Z characters and 0-9 numbers, you can add hyphone and under score
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//One a small character and one capital character and one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(user);
    console.log(result);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    console.log(result);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  return (
    <div className='jwt__register flex flex-col bg-white rounded rounded-t-3xl  w-full h-full translate-y-[-30%] transition ease-in-out duration-500  peer-checked/chk:-translate-y-[90%] '>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'>
        {errMsg}
      </p>
      <label
        htmlFor='chk'
        className='block mb-8 mt-4 text-center font-bold text-blue-400 text-4xl duration-500 scale-50 '>
        Register
      </label>
      <form className='jwt__register-form    px-8 pt-6 pb-8 mb-4 '>
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
