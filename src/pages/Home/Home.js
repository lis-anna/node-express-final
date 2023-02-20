import React, { useState, useEffect } from 'react';
import BookTable from '../../components/BookTable';
import AddBookDrawer from '../../components/AddBookDrawer';

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
    console.log(updatedList);

    setBooksData(updatedList);
  };

  return (
    <>
      <h1 className='welcome'>Welcome !</h1>
      <AddBookDrawer handleNewBook={handleNewBook}></AddBookDrawer>
      <br></br>
      <br></br>
      <BookTable
        booksData={booksData}
        handleBookUpdate={handleBookUpdate}
      ></BookTable>
    </>
  );
}
export default Home;
