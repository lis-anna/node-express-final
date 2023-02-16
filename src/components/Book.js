import React, { useState } from 'react';

//Single book line with CRUD operations

const Book = ({ book, deleteBook, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newParams, setNewParams] = useState({ book });

  // this function is processing editing mode
  const editBook = (event) => {
    console.log('edit');
  };
  // this functino saves new params and calls update book API
  const saveBook = (event) => {
    console.log('save');
  };

  const handleCheck = (event) => {
    console.log('check');
  };
  return (
    <>
      <tr className='book' key={book._id}>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.status}</td>
        <td>${book.note}</td>
        <td>
          <button type='button' class='editButton'>
            edit
          </button>
        </td>
        <td>
          <button type='button' class='deleteButton'>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Book;
