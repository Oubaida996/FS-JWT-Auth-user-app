import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/Input';
import './register.css';

//=====Validate Input
//It can Contain a-z , A-Z characters and 0-9 numbers, you can add hyphone and under score
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//One a small character and one capital character and one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(email);
    console.log(email);
    console.log(result);
    setValidEmail(result);
  }, [email]);

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
  }, [email, pwd, matchPwd]);

  return (
    <div className='jwt__register  w-full flex flex-col bg-slate-50 rounded rounded-t-3xl  absolute top-0 left-0 bottom-0 translate-y-[89%] transition ease-in-out duration-500  peer-checked/chk:translate-y-[0%] peer-checked/chk:rounded '>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live='assertive'>
        {errMsg}
      </p>
      <label
        htmlFor='chk'
        className='block mb-4 text-center font-bold text-blue-400 text-4xl duration-500 scale-50 '>
        Register
      </label>
      <form className='jwt__register-form  px-8 pt-6 pb-2 mb-4 '>
        <Input
          htmlFor='email'
          label='Email'
          placeholder='Email'
          id={'email'}
          refTo={emailRef}
          onChangeFun={(e) => setEmail(e.target.value)}
          valid={validEmail}
          value={email}
          note='emaiNote'
          onFocusFun={() => setEmailFocus(true)}
          onBlurFun={() => setEmailFocus(false)}
          warning={` 4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.`}
        />

        <Input
          htmlFor='pwd'
          label='Password'
          placeholder='Password'
          id={'pwd'}
          onChangeFun={(e) => setPwd(e.target.value)}
          valid={validPwd}
          value={pwd}
          note='pwdNote'
          onFocusFun={() => setPwdFocus(true)}
          onBlurFun={() => setPwdFocus(false)}
          warning={` 8 to 24 characters. Must include uppercase and lowercase letters, a numbers and special character :!@#$%`}
        />
        <Input
          htmlFor='confirmPwd'
          label='Confirm password'
          placeholder='Confirm password'
          id={'matchPwd'}
          onChangeFun={(e) => setMatchPwd(e.target.value)}
          valid={validMatch && matchPwd}
          value={matchPwd}
          note='confirmNote'
          onFocusFun={() => setMatchFocus(true)}
          onBlurFun={() => setMatchFocus(false)}
          warning={`Must match with password`}
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
