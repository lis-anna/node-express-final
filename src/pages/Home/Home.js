import React, { useState } from 'react';

import { useCookies } from 'react-cookie';
import BookList from '../../components/BookList';

function Home() {
  return (
    <>
      <h1 className='welcome'>Welcome !</h1>
      <BookList></BookList>
    </>
  );
}
export default Home;
