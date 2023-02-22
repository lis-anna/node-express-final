import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Button>
      <NavLink
        to='/register'
        className='register'
        colorScheme='teal'
        variant='outline'
      >
        Create an account
      </NavLink>
    </Button>
  );
};

export default Navigation;
