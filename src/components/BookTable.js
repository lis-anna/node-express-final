import React, { useState, Fragment } from 'react';
import DropListButton from './DropdownAndEditDrawer/DropListButton';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { Input, Box, HStack, Button } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import {
  useSort,
  HeaderCellSort,
} from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import '../pages/pages.css';

const BookTable = ({ booksData, handleBookUpdate, handleBookDelete }) => {
  const [titleSearch, setTitleSearch] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const sizes = [10, 30, 50];
  const handleTitleSearch = (event) => {
    setTitleSearch(event.target.value);
  };
  const handleAuthorSearch = (event) => {
    setAuthorSearch(event.target.value);
  };

  const data = {
    nodes: booksData.filter(
      (item) =>
        item.title.toLowerCase().includes(titleSearch.toLowerCase()) &&
        item.author.toLowerCase().startsWith(authorSearch.toLowerCase())
    ),
  };
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleExpand = (itemId) => {
    setExpandedItemId((prevItemId) => (prevItemId === itemId ? null : itemId));
  };

  const sort = useSort(
    data,
    {
      //default sorting
      state: {
        sortKey: 'AUTHOR',
        reverse: false,
      },
      //     onChange: onSortChange,
    },
    {
      sortFns: {
        AUTHOR: (array) =>
          array.sort((a, b) => a.author.localeCompare(b.author)),
        STATUS: (array) =>
          array.sort((a, b) => a.status.localeCompare(b.status)),
        TITLE: (array) => array.sort((a, b) => a.title.localeCompare(b.title)),
      },
    }
  );

  /* function onSortChange(action, state) {
    console.log(action, state);
  }*/
  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  minmax(0, 0.7fr) minmax(0, 1fr) 0.7fr minmax(0, 1fr) minmax(0, 2.2fr)  0.3fr;
      `,
    },
  ]);

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: sizes[0],
    },
    //   onChange: onPaginationChange,
  });

  /*function onPaginationChange(action, state) {
    console.log(action, state);
  }*/
  return (
    <>
      <HStack className='search-fields'>
        <Box w='40%' p={4} className='search-box'>
          <Input
            id='search-a'
            type='text'
            placeholder='Search book author...'
            onChange={handleAuthorSearch}
          />
        </Box>
        <Box w='40%' p={4} className='search-box'>
          <Input
            id='search-t'
            type='text'
            placeholder='Search book title...'
            onChange={handleTitleSearch}
          />
        </Box>
      </HStack>
      <Box>
        <Table
          data={data}
          sort={sort}
          theme={theme}
          pagination={pagination}
          layout={{ custom: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>ISBN</HeaderCell>
                  <HeaderCellSort sortKey='AUTHOR'>Author</HeaderCellSort>
                  <HeaderCellSort sortKey='TITLE'>Title</HeaderCellSort>
                  <HeaderCellSort sortKey='STATUS'>Status</HeaderCellSort>
                  <HeaderCell>Note</HeaderCell>
                  <HeaderCell>Action</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => {
                  return (
                    <React.Fragment key={item._id}>
                      <Row item={item} onClick={() => handleExpand(item._id)}>
                        <Cell>{item.isbn}</Cell>
                        <Cell>{item.author}</Cell>
                        <Cell>{item.title}</Cell>

                        <Cell>{item.status}</Cell>
                        <Cell className='note-cell'>{item.note}</Cell>
                        <Cell>
                          <DropListButton
                            className='droplist-cell'
                            bookID={item._id}
                            handleBookUpdate={handleBookUpdate}
                            handleBookDelete={handleBookDelete}
                            bookParams={item}
                          />
                        </Cell>
                      </Row>
                      {expandedItemId === item._id && (
                        <Row style={{ display: 'flex', gridColumn: '1 / -1' }}>
                          <Cell>
                            <Card size='md'>
                              <CardBody>
                                <ul className='bookcard'>
                                  <li>
                                    <strong>Author:</strong> {item.author}
                                  </li>
                                  <li>
                                    <strong>Title:</strong> {item.title}
                                  </li>
                                  <li>
                                    <strong>Status:</strong> {item.status}
                                  </li>
                                  <li>
                                    <strong>Note:</strong> {item.note}
                                  </li>
                                </ul>
                              </CardBody>
                            </Card>
                          </Cell>
                        </Row>
                      )}
                    </React.Fragment>
                  );
                })}
              </Body>
            </>
          )}
        </Table>
        <Box className='paginator'>
          <span>
            Books on page:{' '}
            {sizes.map((size) => (
              <Button
                className='pagenum'
                key={size}
                type='button'
                style={{
                  fontWeight:
                    pagination.state.size === size ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetSize(size)}
                colorScheme='teal'
                variant='outline'
                size='sm'
              >
                {size}
              </Button>
            ))}
            <Button
              type='button'
              style={{
                fontWeight:
                  pagination.state.size === data.nodes.length
                    ? 'bold'
                    : 'normal',
              }}
              onClick={() => pagination.fns.onSetSize(data.nodes.length)}
              colorScheme='teal'
              variant='outline'
              size='sm'
            >
              All
            </Button>
          </span>

          <span>
            Page:{' '}
            <Button
              type='button'
              disabled={pagination.state.page === 0}
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page - 1)
              }
              colorScheme='teal'
              variant='outline'
              size='sm'
            >
              {'<'}
            </Button>
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <Button
                key={index}
                type='button'
                style={{
                  fontWeight:
                    pagination.state.page === index ? 'bold' : 'normal',
                }}
                onClick={() => pagination.fns.onSetPage(index)}
                colorScheme='teal'
                variant='outline'
                size='sm'
              >
                {index + 1}
              </Button>
            ))}
            <Button
              type='button'
              disabled={
                pagination.state.page + 1 ===
                pagination.state.getTotalPages(data.nodes)
              }
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page + 1)
              }
              colorScheme='teal'
              variant='outline'
              size='sm'
            >
              {'>'}
            </Button>
          </span>
        </Box>
      </Box>
    </>
  );
};

export default BookTable;
