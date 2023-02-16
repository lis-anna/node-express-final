import { useEffect, useState } from 'react';

const BookList = () => {
  const userToken = JSON.parse(localStorage.getItem('token'));
  let message = {};
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const buildbooksTable = async function (token, message) {
      try {
        const response = await fetch('/api/v1/books', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        let bookDataArray = [];
        const data = await response.json();
        if (response.status === 200) {
          if (data.count === 0) {
            return 0;
          } else {
            data.books.map((bookItem) =>
              bookDataArray.push(Object.values(bookItem))
            );

            setBooksData(Array.from(data.books));
          }
        } else {
          message.textContent = data.msg;
          return 0;
        }
      } catch (err) {
        message.textContent = 'A communication error occurred.';
        return 0;
      }
    };
    buildbooksTable(userToken, message);
  }, []);
  // console.log(booksData, 'array');
  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>ISBN</th>
          <th>Status</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {booksData.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.author}</td>
              <td>{item.title}</td>
              <td>{item.isbn}</td>
              <td>{item.status}</td>
              <td>{item.note}</td>
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
          );
        })}
      </tbody>
    </table>
  );
};

export default BookList;
