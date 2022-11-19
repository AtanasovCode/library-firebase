import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AddBook from './AddBook';
import ProgressBar from './ProgressBar';
import profile from './images/user.png';
import edit from './images/edit.png';
import del from './images/delete.png';
import add from './images/add.png';
import './styles/app.css';
import {
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { deepCopy } from '@firebase/util';

function App({
  colRef,
  db,
  auth,
  q,
}) {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [addBookClass, setAddBookClass] = useState("add-container");
  const [blurEffect, setBlurEffect] = useState("library-container");
  const [library, setLibrary] = useState([]);
  const [booksRead, setBooksRead] = useState(0);
  const [bookStatus, setBookStatus] = useState("Not Read");
  const [authClassName, setAuthClassName] = useState("auth-container");


  /*
* This runs every single time there is an update to the database
* No need to refresh the page to see the updated list 
*/

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      })
      setLibrary(books);
    })
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault();
    if(blurEffect === "library-container show") setBlurEffect("library-container");
    addDoc(colRef, {
      title: e.currentTarget.title.value,
      author: e.currentTarget.author.value,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        setTitle("");
        setAuthor("");
      })
  }

  const handleAddBook = () => {
    if(addBookClass === "add-container") setAddBookClass("add-container show");
    if(addBookClass === "add-container show") setAddBookClass("add-container");
    if(blurEffect === "library-container") setBlurEffect("library-container blur");
    if(blurEffect === "library-container blur") setBlurEffect("library-container");
  }

  const handleDelete = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', id);

    deleteDoc(docRef)
      .then(() => {
        alert("Book Deleted");
      })
  }

  // Update data 
  const handleUpdate = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', updateId);
    updateDoc(docRef, {
      title: updateTitle
    })
      .then(() => {
        setUpdateId("");
        setUpdateTitle("");
      })
  }

  //Sign User Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //console.log("user signed out");
        setMail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  const calculateProgress = () => {
    let total = library.length;
    let books = booksRead;

    let percent = 0;

    let progress = books / total;
    if (progress > 0) {
      percent = progress * 100;
    } else {
      percent = 0;
    }

    return parseInt(Math.floor(percent));
  }

  // Subscribe to Auth Change
  onAuthStateChanged(auth, (user) => {
    //console.log("User status changed: ", user === null ? "no users found" : user.email);
  })

  const handleAuth = () => {
    if (authClassName === "auth-container") setAuthClassName("auth-container show")
    if (authClassName === "auth-container show") setAuthClassName("auth-container")
    if(blurEffect === "library-container") setBlurEffect("library-container blur");
    if(blurEffect === "library-container blur") setBlurEffect("library-container");
  }

  const handleRead = () => {
    setBooksRead(booksRead + 1);
  }

  return (
    <div className="app">
      <div className="auth-full-container">
        <SignUp
          mail={mail}
          password={password}
          setMail={setMail}
          setPassword={setPassword}
          auth={auth}
          authClassName={authClassName}
          handleAuth={handleAuth}
        />
        <SignIn
          mail={mail}
          password={password}
          setMail={setMail}
          setPassword={setPassword}
          auth={auth}
          authClassName={authClassName}
          handleAuth={handleAuth}
        />
      </div>
      <img
        src={profile}
        className="profile-icon"
        onClick={handleAuth}
      />
      <AddBook 
        addBookClass={addBookClass} 
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
      />
      <div className={blurEffect}>
        <div className="library-heading-container">
          <div className="heading">Your Library</div>
          <div className="add-book-container" onClick={handleAddBook}>
            <span>Add New Book</span>
            <img 
              src={add}
              alt="add icon"
              className="add-icon"
            />
          </div>
        </div>
        <div className="book-numbers-container">
          <div className="library-info-container">
            <div className="library-info">
              <div className="sub-heading">
                Total Books
              </div>
              <div className="book-number">
                {library.length}
              </div>
            </div>
            <div className="library-info">
              <div className="sub-heading">
                Books Read
              </div>
              <div className="book-number">
                {booksRead}
              </div>
            </div>
            <div className="library-info">
              <div className="sub-heading">
                Books To Read
              </div>
              <div className="book-number">
                {library.length - booksRead}
              </div>
            </div>
          </div>
          <div className="progress-bar-container">
            <ProgressBar progress={calculateProgress()} />
          </div>
        </div>
        {library.map((book) => {
          return (
            <div key={book.id} className="book-container">
              <div className="book-title">
                {book.title}
              </div>
              <div className="book-author">
                {book.author}
              </div>
              <div className="toggle-status">
                <div className="status-name">Status:</div>
                <div className="book-status">
                    {bookStatus}
                </div>
              </div>
              <img
                src={edit}
                alt="edit icon"
                className="icon edit-icon"
              />
              <img
                src={del}
                alt="delete icon"
                className="icon delete-icon"
                onClick={() => console.log("click")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

/*
<form className="delete" onSubmit={handleDelete}>
        <label htmlFor="id">Document id:</label>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
        <button>Delete Book</button>
      </form>
      <form className="update" onSubmit={handleUpdate}>
        <label htmlFor="id">
          Document Id:
        </label>
        <input
          type="text"
          value={updateId}
          name="id"
          onChange={(e) => setUpdateId(e.currentTarget.value)}
          required
        />
        <label htmlFor="title">
          New Title
        </label>
        <input
          type="text"
          value={updateTitle}
          name="title"
          onChange={(e) => setUpdateTitle(e.currentTarget.value)}
          required
        />
        <input
          type="submit"
          value="Update Book"
        />
      </form>
*/