import React, { useState } from 'react';
import BookAPI from '../API/booksAPI';
import {
  Alert,
  AlertIcon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import '../../pages/pages.css';

//this is a dropdown menu, opening left side drawer on edit menu option click

const DropListButton = ({
  bookID,
  handleBookUpdate,
  handleBookDelete,
  bookParams,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userToken = JSON.parse(localStorage.getItem('token'));
  const editBtnID = `dropEBtn${bookID}`;
  const delBtnID = `dropDBtn${bookID}`;
  const statuses = [
    'pending',
    'on hands',
    'coming soon',
    'unavailable',
    'available',
  ];
  const [bookState, setBookState] = useState(bookParams);
  //error handling state variables
  const [dataError, setDataError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setBookState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  //custom closign function to clear error messages before closing
  const handleClose = () => {
    setDataError(false);
    setErrorMessage('');
    onClose();
    //restore form pre-filled input
    setBookState(bookParams);
  };

  //this function gets new attributes from the drawer form and sends it to database
  const handleEditBook = async (event) => {
    event.preventDefault();
    const newBookParams = {
      author: event.target.ed_author.value,
      title: event.target.ed_title.value,
      isbn: event.target.ed_isbn.value,
      status: event.target.ed_status.value,
      note: event.target.ed_note.value,
    };
    //callBookAPI and update book data
    await BookAPI.editBook(newBookParams, bookID, userToken).then((result) => {
      if (result.status !== 200) {
        //if status code is not 200, it means that we got an API error, we handle it and save to state variable
        //   console.log(result.response.data.msg, 'result.response.data.msg');
        setDataError(true);
        const message = result.response.data.msg.split(',').join(', ');
        setErrorMessage(message);
      } else {
        // code = 200, updated successfully
        handleBookUpdate(result.data.book);
        alert('Book updated');
        handleClose();
      }
    });
  };

  //this function is deleting a book from the list
  const handleDelete = async (event) => {
    event.preventDefault();
    await BookAPI.deleteBook(bookID, userToken).then((result) => {
      handleBookDelete(bookID);
      if (result === 200) alert('Book deleted');
    });
  };

  return (
    <>
      <Box className='droplist'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem
              icon={<EditIcon />}
              onClick={onOpen}
              id={editBtnID}
              ref={btnRef}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<DeleteIcon />}
              onClick={handleDelete}
              id={delBtnID}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
        <Drawer
          isOpen={isOpen}
          placement='right'
          size='md'
          onClose={onClose}
          finalFocusRef={btnRef}
          id='ed_sd_drawer'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClose={handleClose} />
            <DrawerHeader>Edit book data</DrawerHeader>
            <form id='edit-form' onSubmit={handleEditBook}>
              <DrawerBody>
                <Stack spacing='24px'>
                  <Input
                    type='text'
                    name='author'
                    id='ed_author'
                    defaultValue={bookState.author}
                    onChange={handleChange}
                  />
                  <Input
                    type='text'
                    name='title'
                    id='ed_title'
                    defaultValue={bookState.title}
                    onChange={handleChange}
                  />
                  <Input
                    type='text'
                    name='isbn'
                    id='ed_isbn'
                    defaultValue={bookState.isbn}
                    onChange={handleChange}
                  />
                  <Box>
                    <FormLabel htmlFor='ed_status'>Select status</FormLabel>
                    <Select
                      name='status'
                      id='ed_status'
                      defaultValue={bookState.status}
                      onChange={handleChange}
                    >
                      {statuses.map((status) => {
                        return (
                          <option
                            key={statuses.indexOf(status)}
                            defaultValue={status}
                          >
                            {status}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor='ed_note'>Note</FormLabel>
                    <Textarea
                      id='ed_note'
                      name='note'
                      defaultValue={bookState.note}
                      onChange={handleChange}
                    />
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
      </Box>
    </>
  );
};

export default DropListButton;
