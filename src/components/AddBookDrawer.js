import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Stack,
  Select,
  Textarea,
  Box,
  FormLabel,
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import BookAPI from './API/booksAPI';

//Add book form. This form uses chakra UI drawer

const AddBookDrawer = ({ bookList }) => {
  //control of the drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userToken = JSON.parse(localStorage.getItem('token'));
  const statuses = [
    'pending',
    'on hands',
    'coming soon',
    'unavailable',
    'available',
  ];
  //function handling Save button. Calls API
  const handleAddBook = (event) => {
    const bookParams = {
      author: event.target.d_author.value,
      title: event.target.d_title.value,
      isbn: event.target.d_isbn.value,
      status: event.target.d_status.value,
      note: event.target.d_note.value,
    };
    // console.log(bookParams);
    const newBook = BookAPI.addBook(bookParams, userToken);
    if (newBook) alert('Book added');
    onClose();
    bookList = [...bookList, newBook];
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        ref={btnRef}
        colorScheme='teal'
        onClick={onOpen}
      >
        New book
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='md'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add new book</DrawerHeader>
          <form
            id='my-form'
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBook(e);
            }}
          >
            <DrawerBody>
              <Stack spacing='24px'>
                <Input type='text' id='d_author' placeholder='author...' />
                <Input type='text' id='d_title' placeholder='title...' />
                <Input type='text' id='d_isbn' placeholder='ISBN...' />
                <Box>
                  <FormLabel htmlFor='d_status'>Select status</FormLabel>
                  <Select id='d_status' defaultValue='Pending'>
                    {statuses.map((status) => {
                      return <option value={status}>{status}</option>;
                    })}
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor='d_note'>Note</FormLabel>
                  <Textarea id='d_note' />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' type='submit'>
                Save
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddBookDrawer;
