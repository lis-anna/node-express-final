import React, { useState } from 'react';

import { useCookies } from 'react-cookie';
import BookList from '../../components/BookList';
import AddBookDrawer from '../../components/AddBookDrawer';

function Home() {
  return (
    <>
      <h1 className='welcome'>Welcome !</h1>
      <AddBookDrawer></AddBookDrawer>
      <br></br>
      <br></br>
      <BookList></BookList>
    </>
  );
}
export default Home;
