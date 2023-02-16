const BookForm = () => {
  return (
    <form>
      <div>
        <label for='title'>title:</label>
        <input type='text' id='title' />
      </div>
      <div>
        <label for='author'>author:</label>
        <input type='text' id='author' />
      </div>
      <div>
        <label for='isbn'>ISBN:</label>
        <input type='text' id='isbn' />
      </div>
      <div>
        <label for='note'>Note:</label>
        <textarea id='note' rows='4' cols='50'></textarea>
      </div>
      <div>
        <label for='status'>status:</label>
        <select id='status'>
          <option value='pending'>pending</option>
          <option value='available'>available</option>
          <option value='on hands'>on hands</option>
          <option value='coming soon'>coming soon</option>
        </select>
      </div>
      <button type='button' id='adding-book'>
        add
      </button>
      <button type='button' id='edit-cancel'>
        cancel
      </button>
    </form>
  );
};
export default BookForm;
