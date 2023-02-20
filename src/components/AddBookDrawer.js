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

const AddBookDrawer = ({ handleNewBook }) => {
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
  //function handling Save button. Calls book API, returns new book data to parent
  const handleAddBook = async (event) => {
    const bookParams = {
      author: event.target.d_author.value,
      title: event.target.d_title.value,
      isbn: event.target.d_isbn.value,
      status: event.target.d_status.value,
      note: event.target.d_note.value,
    };

    const newBook = await BookAPI.addBook(bookParams, userToken).then(
      (newBookParams) => {
        //  setNewBookParams(response);
        handleNewBook(newBookParams);
      }
    );

    if (newBook) alert('Book added');
    onClose();
    //console.log(newBookParams, 'new book params');
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        ref={btnRef}
        colorScheme='teal'
        onClick={onOpen}
        id='d_opn_btn'
      >
        New book
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='md'
        onClose={onClose}
        finalFocusRef={btnRef}
        id='rt_sd_drawer'
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
                  <Select id='d_status' defaultValue='pending'>
                    {statuses.map((status) => {
                      return (
                        <option key={statuses.indexOf(status)} value={status}>
                          {status}
                        </option>
                      );
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
