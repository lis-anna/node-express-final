import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTable from '../../components/BookTable';
import AddBookDrawer from '../../components/AddBookDrawer';
import Header from '../../components/Header/Header';
import LogOutBtn from '../../components/LogoutBtn';
import UserLogo from '../../components/LogoAndTitle/UserLogo';
import {
  Alert,
  AlertIcon,
  Center,
  Heading,
  Avatar,
  Box,
  HStack,
} from '@chakra-ui/react';
import '../../pages/pages.css';
function Home() {
  const userToken = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState([]);
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getBooksData = async function (token) {
      try {
        const response = await fetch('/api/v1/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 401) {
          navigate('/');
          setDataError(true);
          setErrorMessage(response.statusText);
          // console.log('response here only', response);
          return;
        }
        let bookDataArray = [];
        const data = await response.json();
        if (response.status === 200) {
          setDataError(false);
          if (data.count === 0) {
            return 0;
          } else {
            data.books.map((bookItem) =>
              bookDataArray.push(Object.values(bookItem))
            );

            setBooksData(Array.from(data.books));
          }
        } else {
          setDataError(true);
          setErrorMessage(response.data.msg);
          return;
        }
      } catch (err) {
        if (err instanceof Response) {
          setDataError(true);
          setErrorMessage(err.json().toString());
        } else {
          setDataError(true);
          setErrorMessage('An error occurred. Please try again later.');
        }

        return;
      }
    };
    getBooksData(userToken);
  }, []);

  const handleNewBook = (newBookParams) => {
    // Update the books data with the new book parameters
    setBooksData([...booksData, newBookParams]);
  };

  const handleBookUpdate = (newBookParams) => {
    const updatedList = booksData.map((bookItem) =>
      bookItem._id === newBookParams._id ? newBookParams : bookItem
    );
    setBooksData(updatedList);
  };
  const handleBookDelete = (bookID) => {
    setBooksData(booksData.filter((bookItem) => bookItem._id !== bookID));
  };

  return (
    <>
      <Header></Header>

      <HStack className='logo-hor'>
        <Avatar
          size='lg'
          src='https://i.postimg.cc/JhCwD5qr/book-logo.jpg'
          ignoreFallback='true'
          showBorder='false'
        ></Avatar>
        <Heading as='h1' size='lg' className='pageTitle'>
          Just open a book ...
        </Heading>
        <HStack id='userLine'>
          <UserLogo></UserLogo>
          <LogOutBtn></LogOutBtn>
        </HStack>
      </HStack>
      {dataError ? (
        <Alert status='error' className='data-error'>
          <AlertIcon />
          {errorMessage}
        </Alert>
      ) : null}
      {booksData.length === 0 ? (
        <Box>
          <Center>
            <Heading as='h3' size='m' className='pageTitle'>
              No books added to the list yet
            </Heading>
          </Center>
          <AddBookDrawer handleNewBook={handleNewBook}></AddBookDrawer>
        </Box>
      ) : (
        <>
          <AddBookDrawer handleNewBook={handleNewBook}></AddBookDrawer>
          <br></br>
          <br></br>
          <Box className='booktable'>
            <BookTable
              booksData={booksData}
              handleBookUpdate={handleBookUpdate}
              handleBookDelete={handleBookDelete}
            ></BookTable>
          </Box>
        </>
      )}
    </>
  );
}
export default Home;
