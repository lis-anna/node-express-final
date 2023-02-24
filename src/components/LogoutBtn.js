import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const LogOutBtn = () => {
  const navigate = useNavigate();

  const submitLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <Button
      colorScheme='teal'
      variant='outline'
      onClick={submitLogOut}
      className='logout'
    >
      Log out
    </Button>
  );
};

export default LogOutBtn;
