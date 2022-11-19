import './styles/add-book.css';

const AddBook = ({
    title,
    setTitle,
    author,
    setAuthor,
    handleSubmit,
    addBookClass,
}) => {
    return (
        <form className={addBookClass} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    className="book-input"
                    placeholder="Book Title"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={author}
                    className="book-input"
                    placeholder="Book Author"
                    onChange={(e) => setAuthor(e.currentTarget.value)}
                    required
                />
            <input
                type="submit"
                value="Add Book"
                className="submit-book-btn"
            />
        </form>
    );
}

export default AddBook;