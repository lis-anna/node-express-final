import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import '../pages/pages.css';

const LogOutBtn = () => {
  const navigate = useNavigate();

  const submitLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('lastname');
    navigate('/');
  };
  return (
    <Button
      colorScheme='teal'
      variant='outline'
      onClick={submitLogOut}
      className='logout'
      id='d_logt_btn'
    >
      Log out
    </Button>
  );
};

export default LogOutBtn;
