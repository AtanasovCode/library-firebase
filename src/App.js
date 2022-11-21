import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AddBook from './AddBook';
import UserProfile from './UserProfile';
import ProgressBar from './ProgressBar';
import profile from './images/user.png';
import edit from './images/edit.png';
import del from './images/delete.png';
import add from './images/add.png';
import './styles/app.css';
import {
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  doc,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  getAuth,
  updateProfile,
} from 'firebase/auth'

function App() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMail, setRegMail] = useState("");
  const [user, setUser] = useState({});
  const [authContainerClassName, setAuthContainerClassName] = useState("auth-full-container")
  const [newUser, setNewUser] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [addBookClass, setAddBookClass] = useState("add-container");
  const [blurEffect, setBlurEffect] = useState("library-container");
  const [library, setLibrary] = useState([]);
  const [booksRead, setBooksRead] = useState(0);
  const [bookStatus, setBookStatus] = useState("Not Read");
  const [authClassName, setAuthClassName] = useState("auth-container");


  const auth = getAuth();
  const db = getFirestore();

  const colRef = collection(db, 'books');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const q = query(colRef, where("userId", "==", currentUser.uid), orderBy("createdAt", "asc"));
        onSnapshot(q, (snapshot) => {
          let books = []
          snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
          })
          setLibrary(books);
        })
        setUser(currentUser);
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    })
  }, [])

  const handleAuth = () => {
    authContainerClassName === "auth-full-container" ? setAuthContainerClassName("auth-full-container show") : setAuthContainerClassName("auth-full-container");
    blurEffect === "library-container" ? setBlurEffect("library-container blur") : setBlurEffect("library-container");
  }

  const handleNewUser = () => {
    newUser === true ? setNewUser(false) : setNewUser(true);
  }

  const handleAddBook = () => {
    addBookClass === "add-container" ? setAddBookClass("add-container show") : setAddBookClass("add-container");
    blurEffect === "library-container" ? setBlurEffect("library-container blur") : setBlurEffect("library-container");
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

  // Update data 
  const handleUpdate = (id) => {
    const docRef = doc(db, 'books', id);
    updateDoc(docRef, {
      status: "Read"
     
    })
      .then(() => {
        setBooksRead(booksRead + 1);
        updateProfile(user, {
          booksRead: booksRead,
      })
      .then(() => {
          console.log("profile updated");
          console.log(user.booksRead);
      })
      })
  }

  return (
    <div className="app">
      <div className={authContainerClassName}>
        {userLoggedIn ?
          <UserProfile
            regMail={regMail}
            setRegMail={setRegMail}
            regPassword={regPassword}
            setRegPassword={setRegPassword}
            username={username}
            setUsername={setUsername}
            user={user}
            setUser={setUser}
            auth={auth}
            authClassName={authClassName}
            handleAuth={handleAuth}
            handleNewUser={handleNewUser}
            library={library} 
            booksRead={booksRead}
          />
          :
          newUser ?
            <SignUp
              regMail={regMail}
              setRegMail={setRegMail}
              regPassword={regPassword}
              setRegPassword={setRegPassword}
              username={username}
              setUsername={setUsername}
              user={user}
              setUser={setUser}
              auth={auth}
              authClassName={authClassName}
              handleAuth={handleAuth}
              handleNewUser={handleNewUser}
            />
            :
            <SignIn
              mail={mail}
              password={password}
              setMail={setMail}
              setPassword={setPassword}
              auth={auth}
              authClassName={authClassName}
              handleAuth={handleAuth}
              handleNewUser={handleNewUser}
            />
        }
      </div>
      <img
        src={profile}
        className="profile-icon"
        onClick={handleAuth}
      />
      <div className="user-name">
        {userLoggedIn ? user.displayName : "Sign Up"}
      </div>
      <AddBook
        addBookClass={addBookClass}
        handleAddBook={handleAddBook}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        blurEffect={blurEffect}
        setBlurEffect={setBlurEffect}
        addDoc={addDoc}
        colRef={colRef}
        user={user}
        serverTimestamp={serverTimestamp}
      />
      <div className={blurEffect}>
        <div className="library-heading-container">
          <div className="heading">Your Library</div>
          {
            userLoggedIn ?
              <div className="add-book-container" onClick={handleAddBook}>
                <span>Add New Book</span>
                <img
                  src={add}
                  alt="add icon"
                  className="add-icon"
                />
              </div>
              :
              <div className="add-book-container">
                <span>Sign in To Add Books</span>
                <img
                  src={add}
                  alt="add icon"
                  className="add-icon"
                />
              </div>
          }
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
        {userLoggedIn === false ?
          <div>
            <h3>Please Sign In To Add/View Books</h3>
          </div>
          :
          library.map((book) => {
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
                  <div className="book-status" onClick={() => handleUpdate(book.id)}>
                    {book.status}
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

  const handleDelete = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', id);

    deleteDoc(docRef)
      .then(() => {
        alert("Book Deleted");
      })
  }

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