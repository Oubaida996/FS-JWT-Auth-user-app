import React from 'react';

export default function Input({ forHtml, label, placeholder }) {
  return (
    <div className='jwt__input mb-4'>
      {/* <label
        htmlFor={forHtml}
        className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label> */}
      <input
        type='text'
        placeholder={placeholder}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none  focus:shadow-outline'
      />
    </div>
  );
}
