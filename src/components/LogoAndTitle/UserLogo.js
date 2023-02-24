import React from 'react';

import { Avatar, Text, Center, HStack } from '@chakra-ui/react';

const UserLogo = () => {
  const name = JSON.parse(localStorage.getItem('name'));
  const lastName = JSON.parse(localStorage.getItem('lastname'));
  const userName = `${name} ${lastName}`;
  return (
    <>
      <HStack>
        <Avatar
          size={'md'}
          src=''
          name={userName}
          bg='teal.500'
          color='whiteAlpha.900'
        />
        <Text fontWeight='light' fontStyle='italic'>
          {userName}
        </Text>
      </HStack>
    </>
  );
};

export default UserLogo;
