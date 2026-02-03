import React from 'react';

const Toast = ({ message, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-[60px] left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white text-black px-4 py-3 rounded font-bold text-[14px] shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Toast;
