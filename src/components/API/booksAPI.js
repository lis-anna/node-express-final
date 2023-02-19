import axios from 'axios';
require('dotenv').config();
const apiURL = 'http://localhost:5000/api/v1';

class BookAPI {
  static async addBook(bookParams, bearerKey) {
    //  console.log('book', bookParams);
    return await axios
      .post(
        apiURL + `/books`,
        {
          author: `${bookParams.author}`,
          title: `${bookParams.title}`,
          isbn: `${bookParams.isbn}`,
          status: `${bookParams.status}`,
          note: `${bookParams.note}`,
        },
        {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((result) => {
        return result.data.books;
      })
      .catch((error) =>
        console.log('Whoops, the book adding process went wrong!', error)
      );
  }

  //Change existing record

  static async updateToDo(newBookParams, bookID, bookData, bearerKey) {
    console.log("I'm here updating book", bookID, newBookParams);
    return await axios
      .patch(
        apiURL + `/books/${bookID}`,
        {
          author: `${newBookParams.author}`,
          title: `${newBookParams.title}`,
          isbn: `${newBookParams.isbn}`,
          status: `${newBookParams.status}`,
          note: `${newBookParams.note}`,
        },
        {
          headers: {
            accept: '*/*',
            Authorization: `Bearer ${bearerKey}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((result) => {
        console.log(result);
        //this should be optimized
        const updatedList = bookData.map((bookItem) =>
          bookItem._id === bookID ? result.data.bookItem : bookItem
        );
        return updatedList;
      })
      .catch((error) =>
        console.log('Whoops, the book editing process went wrong!', error)
      );
  }

  //Delete record
  static async deleteToDo(bookID, bookData, bearerKey) {
    //   console.log(todo);
    return await axios
      .delete(apiURL + `/books/${bookID}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${bearerKey}`,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        //console.log(result);
        const updatedList = bookData.filter((e) => e._id !== bookID);
        return updatedList;
      })
      .catch((error) =>
        console.log('Whoops, the book deleting process went wrong!', error)
      );
  }

  //Move to favorites
}

export default BookAPI;
