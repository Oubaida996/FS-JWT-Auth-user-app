import React from 'react';

const Loading = () => {
  return (
    <section className='jwt__loading min-h-[500px] absolute w-full z-10 top-0 left-0 grid place-content-center   overflow-hidden  p-4 bg-slate-400/20 shadow-md rounded'>
      <span className='jwt__loading-spinner animate-spin w-14 h-14 rounded-full border-solid border-stone-600/50 border-t-white   border-4'></span>
    </section>
  );
};

export default Loading;
