import { useState } from 'react';
import DropListButton from './Dropdown/DropListButton';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Input } from '@chakra-ui/react';

/*const THEME = {
  HeaderRow: `
    font-size: 14px;

    background-color: #eaf5fd;
  `,
  Row: `
    font-size: 14px;

    &:nth-child(odd) {
      background-color: #d2e9fb;
    }

    &:nth-child(even) {
      background-color: #eaf5fd;
    }
  `,
};*/

const BookTable = ({ booksData, handleBookUpdate, handleBookDelete }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = {
    nodes: booksData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ),
  };
  const theme = useTheme(getTheme());
  return (
    <>
      <label htmlFor='search'>
        Search book by title:
        <Input
          id='search'
          type='text'
          placeholder='enter book title here...'
          onChange={handleSearch}
        />
      </label>

      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Author</HeaderCell>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>ISBN</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Note</HeaderCell>
                <HeaderCell>Action</HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item) => {
                return (
                  <Row key={item._id} item={item}>
                    <Cell>{item.author}</Cell>
                    <Cell>{item.title}</Cell>
                    <Cell>{item.isbn}</Cell>
                    <Cell>{item.status}</Cell>
                    <Cell>{item.note}</Cell>
                    <Cell>
                      <DropListButton
                        bookID={item._id}
                        handleBookUpdate={handleBookUpdate}
                        handleBookDelete={handleBookDelete}
                        bookParams={item}
                      />
                    </Cell>
                  </Row>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default BookTable;
