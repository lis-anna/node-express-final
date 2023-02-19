import { FaEllipsisH } from 'react-icons/fa';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import {
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

const DropListButton = (bookID) => {
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (e) => {
    e.stopPropagation();
  };
  const handleDelete = (e) => {
    e.stopPropagation();
  };

  const openModal = (e) => {
    console.log(e);
  };

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
            onClick={() => handleEdit(bookID)}
            command='⌘T'
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(bookID)}
            command='⌘N'
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default DropListButton;
