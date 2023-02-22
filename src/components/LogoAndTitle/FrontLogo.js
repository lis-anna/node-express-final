import React from 'react';

import { Avatar, Button, Box, Stack, Center, Heading } from '@chakra-ui/react';

const FrontLogo = () => {
  return (
    <>
      <Stack align='center' className='frontlogo'>
        <Avatar
          size='2xl'
          src='https://i.postimg.cc/JhCwD5qr/book-logo.jpg'
          ignoreFallback='true'
          showBorder='false'
        ></Avatar>
        <Heading as='h1' size='lg' className='pageTitle'>
          Just open a book ...
        </Heading>
      </Stack>
    </>
  );
};

export default FrontLogo;
