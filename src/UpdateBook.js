import close from './images/close.png';
import './styles/add-book.css';
import {
    doc,
    updateDoc,
    setDoc,
} from 'firebase/firestore';

const UpdateBook = ({
    title,
    setTitle,
    author,
    setAuthor,
    bookStatus,
    setBookStatus,
    db,
    updateId,
    setUpdateId,
    updateBookClass,
    handleUpdateBook,
}) => {

    const handleBookUpdate = () => {
        const docRef = doc(db, 'books', updateId);
        updateDoc(docRef, {
            title: title,
            author: author,
            status: bookStatus,
        })
            .then(() => {
                setTitle("");
                setAuthor("");
                setUpdateId("");
                handleUpdateBook();
                console.log(bookStatus);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return (
        <form className={updateBookClass}>
            <div className="update-book-close" onClick={handleUpdateBook}>
                <img
                    src={close}
                    alt="close icon"
                    className="close-icon-book"
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
            <select className="book-select-status" onClick={(e) => setBookStatus(e.currentTarget.value === "true" ? true : false)}>
                <option value="true">Finished</option>
                <option value="false">In Progress</option>
            </select>
            <input
                type="button"
                value="Update Book"
                className="submit-book-btn"
                onClick={handleBookUpdate}
            />
        </form>
    );
}

export default UpdateBook;