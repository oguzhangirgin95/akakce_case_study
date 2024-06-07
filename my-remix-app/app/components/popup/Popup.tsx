import React from 'react';

interface Props {
  message: any;
}

export const Popup: React.FC<Props> = ({ message }) => {

  return (
    <p className='error-text'>{message}</p>
  );
};
