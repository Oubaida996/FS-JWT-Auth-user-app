import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faCheck,
  // faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
export default function Input({
  htmlFor,
  label,
  placeholder,
  id,
  refTo,
  onChangeFun,
  valid,
  value,
  note,
  focusField,
  onFocusFun,
  onBlurFun,
  warning,
}) {
  const [stateOfBorder, setStateOfBorder] = useState('');
  useEffect(() => {
    console.table({ valid, value });
    if (!valid && !value) {
      setStateOfBorder('');
    } else if (valid && value) {
      setStateOfBorder('border-green-500');
    } else {
      setStateOfBorder('border-red-500');
    }
  }, [valid, value]);

  return (
    <div className='jwt__input mb-4'>
      {/* <label
        htmlFor={htmlFor}
        className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label> */}
      {/* <span className={valid ? 'valid' : 'hide'}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={valid || !value ? 'hide' : 'invalid'}>
        <FontAwesomeIcon icon={faTimes} />
      </span> */}
      <input
        type='text'
        placeholder={placeholder}
        className={` shadow  appearance-none border ${stateOfBorder} rounded  py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none `}
        id={id}
        ref={refTo}
        autoComplete='off'
        onChange={onChangeFun}
        required
        aria-invalid={valid ? 'false' : 'true'}
        aria-describedby={note}
        onFocus={onFocusFun}
        onBlur={onBlurFun}
      />

      <p
        id={note}
        className={
          value && focusField && !valid ? 'instructions' : 'offscreen'
        }>
        <FontAwesomeIcon icon={faInfoCircle} />
        {warning}
      </p>
    </div>
  );
}
