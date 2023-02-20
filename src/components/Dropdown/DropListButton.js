import { FaEllipsisH } from 'react-icons/fa';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import EditBookDrawer from '../EditBookDrawer';
import root from '../../index';

const DropListButton = (bookID, handleBookUpdate, bookParams) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef();
  const handleEdit = (bookID) => {
    onOpen();
    console.log('editing');
    return (
      <Box>
        <EditBookDrawer
          handleBookUpdate={handleBookUpdate}
          ref={btnRef}
          oldBookParams={bookParams}
          bookID={bookID}
          isOpen={isOpen}
        ></EditBookDrawer>
      </Box>
    );
  };
  const handleDelete = (e) => {};

  const editBtnID = `dropEBtn${bookID}`;
  const delBtnID = `dropDBtn${bookID}`;
  return (
    <>
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
            onClick={(e) => {
              e.preventDefault();
              handleEdit(bookID, handleBookUpdate, bookParams);
            }}
            command='⌘T'
            id={editBtnID}
            ref={btnRef}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(bookID)}
            command='⌘N'
            id={delBtnID}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropListButton;
