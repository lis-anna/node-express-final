import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
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
import '.././pages/pages.css';

//Add book form. This form uses chakra UI drawer

const AddBookDrawer = ({ handleNewBook }) => {
  //error handling state variables
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //control of the drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //get user token from local storage
  const userToken = JSON.parse(localStorage.getItem('token'));
  //enum of book statuses
  const statuses = [
    'pending',
    'on hands',
    'coming soon',
    'unavailable',
    'available',
  ];
  //function handling Save button. Calls book API, returns new book data to parent
  const handleAddBook = async (event) => {
    event.preventDefault();
    const bookParams = {
      author: event.target.d_author.value,
      title: event.target.d_title.value,
      isbn: event.target.d_isbn.value,
      status: event.target.d_status.value,
      note: event.target.d_note.value,
    };

    await BookAPI.addBook(bookParams, userToken).then((result) => {
      if (result.status !== 201) {
        /*if status code is not 201 (created), it means that we got an API error, we handle it ans save to state variable*/
        //  console.log(result.response.data.msg, 'result.response.data.msg');
        setDataError(true);
        const message = result.response.data.msg.split(',').join(', ');
        setErrorMessage(message);
      } else {
        //if code = 201, success path
        // console.log(result.data.book);
        handleNewBook(result.data.book);
        //clean errors and close window
        setDataError(false);
        setErrorMessage('');
        alert('Book added');
        onClose();
      }
    });
  };
  //closing drawer: clean error state variables bofore closing
  const handleClose = () => {
    setDataError(false);
    setErrorMessage('');
    onClose();
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
          <DrawerCloseButton onClick={handleClose} />
          <DrawerHeader>Add new book</DrawerHeader>
          <form id='my-form' onSubmit={handleAddBook}>
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
              <Button variant='outline' mr={3} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' type='submit'>
                Save
              </Button>
            </DrawerFooter>
          </form>
          {dataError ? (
            <Alert status='error' className='data-error'>
              <AlertIcon />
              {errorMessage}
            </Alert>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddBookDrawer;
