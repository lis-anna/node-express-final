import { useState } from 'react';
import { login } from '../components/API/Auth';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useCookies } from 'react-cookie';
import '../pages/pages.css';

//import { useSetRecoilState } from 'recoil';
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
import FrontLogo from '../components/LogoAndTitle/FrontLogo';

const LogInPage = () => {
  const [logInError, setLogInError] = useState(false);
  const navigate = useNavigate();
  //const setAuth = useSetRecoilState(authAtom);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const submitLogIn = async (e) => {
    try {
      e.preventDefault();
      let result = await login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      console.log(result, 'result.....');
      if (result) {
        setLogInError(false);
        //const token = JSON.parse(localStorage.getItem('token'));
        //console.log(token);
        // setAuth(localStorage.getItem('user'));
        navigate('/home');
      }
    } catch (error) {
      setLogInError(true);
    }
  };

  return (
    <>
      <div>
        <Header className='page-header'></Header>
        <FrontLogo></FrontLogo>
        <div className='auth-form-container'>
          <FormControl>
            <form
              id='formBkgd'
              action=''
              onSubmit={submitLogIn}
              className='login-form'
            >
              <Center>
                <Box className='inputFields' w='50%'>
                  <Stack align='center'>
                    <Input
                      variant='flushed'
                      type='email'
                      name='email'
                      placeholder='Enter email'
                      id='email'
                    />
                    <InputGroup size='md'>
                      <Input
                        variant='flushed'
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        id='password'
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
                      Login
                    </Button>
                    <h2 className='reglink'>
                      <NavLink
                        to='/register'
                        className='register'
                        style={{ border: 'none', fontSize: '0.9em' }}
                      >
                        Create an account
                      </NavLink>
                    </h2>
                  </Stack>

                  {logInError ? (
                    <Alert status='error' className='login-error'>
                      <AlertIcon />
                      Invalid Password or Username
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
};

export default LogInPage;
