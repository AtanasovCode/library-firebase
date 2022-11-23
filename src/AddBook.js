import './styles/add-book.css';
import close from './images/close.png';
import { updateDoc, doc, } from 'firebase/firestore';

const AddBook = ({
    title,
    setTitle,
    author,
    setAuthor,
    addBookClass,
    addDoc,
    serverTimestamp,
    colRef,
    handleAddBook,
    user,
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoc(colRef, {
            title: e.currentTarget.title.value,
            author: e.currentTarget.author.value,
            createdAt: serverTimestamp(),
            status: false,
            finishedAt: serverTimestamp(),
            userId: user.uid,
        })
            .then(() => {
                handleAddBook();
                setTitle("");
                setAuthor("");
            })
    }

    return (
        <form className={addBookClass} onSubmit={handleSubmit}>
            <div className="add-book-close">
                <img
                    src={close}
                    alt="close icon"
                    className="close-icon-book"
                    onClick={handleAddBook}
                />
            </div>
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