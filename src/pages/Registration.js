import BookAPI from '../components/API/booksAPI';
import { register } from '../components/API/Auth';
import Header from '../components/Header/Header';
import FrontLogo from '../components/LogoAndTitle/FrontLogo';
import { ValidationPassword } from '../middleware/ValidationPassword';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

/*import { useCookies } from 'react-cookie';
import { authAtom } from '../state/atom-auth';
import { useSetRecoilState } from 'recoil';*/
import {
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  Box,
  Stack,
  Center,
  Alert,
} from '@chakra-ui/react';

import '../pages/pages.css';

function Registration() {
  // const [error, setError] = useState('');
  // const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
  //const setAuth = useSetRecoilState(authAtom);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const submitRegForm = async (e) => {
    try {
      e.preventDefault();
      let result = await register({
        name: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      //   console.log(result, 'result.....');
      if (result) {
        setLogInError(false);
        navigate('/home');
      }
    } catch (error) {
      console.log(error, 'error');
      setLogInError(true);
    }
  };

  /*const successMessage = () => {
    return (
      <div
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>
          {' '}
          {userFirstName} {userLastName} is now registered!
        </h1>
      </div>
    );
  };*/

  return (
    <>
      <div>
        <Header className='page-header'></Header>
        <FrontLogo></FrontLogo>
        <div className='auth-form-container'>
          <FormControl>
            <form
              id='auth-form'
              action=''
              onSubmit={submitRegForm}
              className='login-form'
            >
              <Center>
                <Box className='inputFields' w='50%'>
                  <Stack align='center'>
                    <Input
                      variant='flushed'
                      type='text'
                      name='firstname'
                      placeholder='Enter first name'
                      isRequired={true}
                      id='reg_fname'
                    />
                    <Input
                      variant='flushed'
                      type='text'
                      name='lastname'
                      placeholder='Enter last name'
                      isRequired={true}
                      id='reg_lname'
                    />
                    <Input
                      variant='flushed'
                      type='email'
                      name='email'
                      placeholder='Enter email'
                      isRequired={true}
                      id='reg_email'
                    />
                    <InputGroup size='md'>
                      <Input
                        variant='flushed'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        name='password'
                        placeholder='Enter password'
                        isRequired={true}
                        id='reg_password'
                      />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <Button
                      className='loginbtn'
                      type='submit'
                      w='50%'
                      colorScheme='teal'
                    >
                      Register
                    </Button>
                    <h2 className='reglink'>
                      <NavLink
                        to='/'
                        className='register'
                        style={{ border: 'none', fontSize: '0.9em' }}
                      >
                        I'm not a new user
                      </NavLink>
                    </h2>
                  </Stack>

                  {logInError ? (
                    <Alert status='error' className='login-error'>
                      <AlertIcon />
                      Invalid registration data
                    </Alert>
                  ) : null}
                </Box>
              </Center>
            </form>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Registration;
