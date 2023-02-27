import { register } from '../components/API/Auth';
import Header from '../components/Header/Header';
import FrontLogo from '../components/LogoAndTitle/FrontLogo';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../pages/pages.css';
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

function Registration() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(false);
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
      setLogInError(true);
      // console.log(error);
      setErrorMessage(error.response.data.msg);
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
                      {errorMessage}
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
