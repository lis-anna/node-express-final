import React, { useState, useEffect } from 'react';
import BookTable from '../../components/BookTable';
import AddBookDrawer from '../../components/AddBookDrawer';
import Header from '../../components/Header/Header';
import LogOutBtn from '../../components/LogoutBtn';
import UserLogo from '../../components/LogoAndTitle/UserLogo';
import { Center, Heading, Avatar, Flex, Box, HStack } from '@chakra-ui/react';

function Home() {
  const userToken = JSON.parse(localStorage.getItem('token'));
  let message = {};
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const getBooksData = async function (token, message) {
      try {
        const response = await fetch('/api/v1/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        let bookDataArray = [];
        const data = await response.json();
        if (response.status === 200) {
          if (data.count === 0) {
            return 0;
          } else {
            data.books.map((bookItem) =>
              bookDataArray.push(Object.values(bookItem))
            );

            setBooksData(Array.from(data.books));
          }
        } else {
          message.textContent = data.msg;
          return 0;
        }
      } catch (err) {
        message.textContent = 'A communication error occurred.';
        return 0;
      }
    };
    getBooksData(userToken, message);
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
          <BookTable
            booksData={booksData}
            handleBookUpdate={handleBookUpdate}
            handleBookDelete={handleBookDelete}
          ></BookTable>
        </>
      )}
    </>
  );
}
export default Home;
