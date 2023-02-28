import axios from 'axios';

const apiURL = process.env.REACT_APP_BASE_URL; //'http://localhost:5000/api/v1';
//console.log(apiURL, 'apiURL');
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
        //    console.log(result.data.book, 'result.data.book');
        return result;
      })
      .catch((error) => {
        //  console.log('Whoops, the book adding process went wrong!', error);
        return error;
      });
  }

  //Change existing record
  static async editBook(newBookParams, bookID, bearerKey) {
    // console.log("I'm here updating book", bookID, newBookParams);
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
        //  console.log(result.data);
        return result;
      })
      .catch((error) => {
        //     console.log('Whoops, the book editing process went wrong!', error);
        return error;
      });
  }

  //Delete record
  static async deleteBook(bookID, bearerKey) {
    return await axios
      .delete(apiURL + `/books/${bookID}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${bearerKey}`,
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        //  console.log(result.status);
        return result.status;
      })
      .catch((error) =>
        console.log('Whoops, the book deleting process went wrong!', error)
      );
  }
}

export default BookAPI;
