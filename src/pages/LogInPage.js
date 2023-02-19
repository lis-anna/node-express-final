import { useState } from 'react';
import { login } from '../components/API/Auth';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import { authAtom } from '../state/atom-auth';
//import { useSetRecoilState } from 'recoil';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const LogInPage = () => {
  const [logInError, setLogInError] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  //const setAuth = useSetRecoilState(authAtom);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

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
    <div>
      <div className='auth-form-container'>
        <FormControl>
          <form
            id='formBkgd'
            action=''
            onSubmit={submitLogIn}
            className='login-form'
          >
            <h1 className='logAvatar'>
              <h2 className='logo'>
                <em>Library book list</em>
              </h2>
              <NavLink
                to='/register'
                className='register'
                style={{ border: 'none', fontSize: '14px' }}
              >
                Create an account
              </NavLink>
            </h1>
            <div className='inputFields'>
              <FormLabel>
                Email:
                <Input
                  type='email'
                  name='email'
                  placeholder='email'
                  id='email'
                />
              </FormLabel>
              <br />
              <FormLabel>
                Password:
                <Input
                  type={passwordShown ? 'text' : 'password'}
                  name='password'
                  placeholder='password'
                  id='password'
                />
              </FormLabel>

              <Button className='logbtn' type='submit'>
                Login
              </Button>

              {logInError ? (
                <p className='login-error'>
                  <small>Invalid Password or Username</small>
                </p>
              ) : null}
            </div>
          </form>
        </FormControl>
        a
        <button id='eye' onClick={togglePassword}>
          {passwordShown ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

export default LogInPage;
