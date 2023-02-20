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

import BookAPI from './API/booksAPI';

//Add book form. This form uses chakra UI drawer

const EditBookDrawer = ({
  handleBookUpdate,
  buttonRef,
  oldBookParams,
  bookID,
  //onOpen,
}) => {
  //control of the drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();
  const userToken = JSON.parse(localStorage.getItem('token'));
  const statuses = [
    'pending',
    'on hands',
    'coming soon',
    'unavailable',
    'available',
  ];
  const { author, title, isbn, status, note } = { oldBookParams };
  console.log(author, 'author');
  //function handling Save button. Calls book API, returns new book data to parent
  const handleEditBook = async (event) => {
    const newBookParams = {
      author: event.target.d_author.value,
      title: event.target.d_title.value,
      isbn: event.target.d_isbn.value,
      status: event.target.d_status.value,
      note: event.target.d_note.value,
    };

    const updatedBook = await BookAPI.editBook(
      newBookParams,
      bookID,
      userToken
    ).then((newBookParams) => {
      //  setNewBookParams(response);
      handleBookUpdate(newBookParams);
    });

    if (updatedBook) alert('Book updated');
    onClose();
    //console.log(newBookParams, 'new book params');
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        size='md'
        onClose={onClose}
        finalFocusRef={buttonRef}
        id='ed_sd_drawer'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit book data</DrawerHeader>
          <form
            id='edit-form'
            onSubmit={(e) => {
              e.preventDefault();
              handleEditBook(e);
            }}
          >
            <DrawerBody>
              <Stack spacing='24px'>
                <Input type='text' id='ed_author' value={author} />
                <Input type='text' id='ed_title' value={title} />
                <Input type='text' id='ed_isbn' value={isbn} />
                <Box>
                  <FormLabel htmlFor='ed_status'>Select status</FormLabel>
                  <Select id='ed_status' value={status}>
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
                  <FormLabel htmlFor='ed_note'>Note</FormLabel>
                  <Textarea id='ed_note' value={note} />
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

export default EditBookDrawer;
