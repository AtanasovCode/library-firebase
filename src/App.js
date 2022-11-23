import { useEffect, useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import UserProfile from './UserProfile';
import ProgressBar from './ProgressBar';
import profile from './images/user.png';
import Loading from './Loading';
import add from './images/add.png';
import slideDown from './images/slide-down.png';
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
  deleteDoc,
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
  const [updateId, setUpdateId] = useState();
  const [regMail, setRegMail] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authContainerClassName, setAuthContainerClassName] = useState("auth-full-container")
  const [newUser, setNewUser] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [updatedBook, setUpdatedBook] = useState(false);
  const [addBookClass, setAddBookClass] = useState("add-container");
  const [updateBookClass, setUpdateBookClass] = useState("update-container")
  const [blurEffect, setBlurEffect] = useState("library-container");
  const [library, setLibrary] = useState([]);
  const [booksRead, setBooksRead] = useState(0);
  const [bookStatus, setBookStatus] = useState();
  const [authClassName, setAuthClassName] = useState("auth-container");


  const auth = getAuth();
  const db = getFirestore();

  const colRef = collection(db, 'books');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const q = query(colRef, where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
          let books = []
          snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
          })
          setLibrary(books);
          setLoading(false);
        })
        setUser(currentUser);
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
        setLibrary([]);
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

  const handleUpdateBook = () => {
    updateBookClass === "update-container" ? setUpdateBookClass("update-container show") : setUpdateBookClass("update-container");
    blurEffect === "library-container" ? setBlurEffect("library-container blur") : setBlurEffect("library-container");
  }

  const getUserRank = () => {
    let rank = "Book Newbie";
    if (booksRead >= 1 && booksRead < 3) {
      rank = "Book Amateur";
    } else if (booksRead >= 3 && booksRead < 5) {
      rank = "Book Enjoyer";
    } else if (booksRead >= 5 && booksRead < 10) {
      rank = "Book Worm";
    } else if (booksRead >= 10 && booksRead < 15) {
      rank = "Book Surgeon"
    } else if (booksRead >= 15 && booksRead < 20) {
      rank = "Book Magician";
    } else if (booksRead >= 20 && booksRead < 30) {
      rank = "Book Master";
    } else if (booksRead >= 30) {
      rank = "Book Grandmaster";
    }
    return rank;
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
      status: true,
      finishedAt: serverTimestamp(),
    })
  }


  useEffect(() => {
    let number = 0;
    library.map((book) => {
      if (book.status) {
        number++;
      }
    })
    setBooksRead(number);
  }, [library])

  const timeOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  };


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
            getUserRank={getUserRank}
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
        setUpdatedBook={setUpdatedBook}
        updatedBook={updatedBook}
        setAuthor={setAuthor}
        addDoc={addDoc}
        colRef={colRef}
        user={user}
        serverTimestamp={serverTimestamp}
      />
      <UpdateBook
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        bookStatus={bookStatus}
        setBookStatus={setBookStatus}
        updateId={updateId}
        setUpdateId={setUpdateId}
        handleUpdateBook={handleUpdateBook}
        db={db}
        updateBookClass={updateBookClass}
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
                Total
              </div>
              <div className="book-number">
                {library.length}
              </div>
            </div>
            <div className="library-info">
              <div className="sub-heading">
                Finished
              </div>
              <div className="book-number">
                {booksRead}
              </div>
            </div>
            <div className="library-info">
              <div className="sub-heading">
                To Read
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
          loading === true ?
            <Loading />
            :
            library.map((book) => {
              return (
                <div
                  key={book.id}
                  className="book-container"
                >
                  <div className="main-book-info">
                    <div className="book-title" name="title">
                      {book.title}
                    </div>
                    <div className="book-author">
                      {book.author}
                    </div>
                    <div className="toggle-status">
                      <div className="status-name">Status:</div>
                      <div className="book-status" style={{ color: book.status ? "lime" : "#fff" }} onClick={() => handleUpdate(book.id)}>
                        {book.status ? "Finished" : "In Progress"}
                      </div>
                    </div>
                    <img
                      src={slideDown}
                      alt="arrow down"
                      className="slide-down-icon"
                      onClick={(e) => { //Change the book-container class && change the icon's class 
                        if (e.currentTarget.parentNode.parentNode.className === "book-container") {
                          e.currentTarget.className = "slide-down-icon up"
                          e.currentTarget.parentNode.parentNode.className = "book-container more-info";
                        } else {
                          e.currentTarget.className = "slide-down-icon"
                          e.currentTarget.parentNode.parentNode.className = "book-container";
                        }
                      }}
                    />
                  </div>
                  <div className="more-book-info">
                    <div className="book-date">
                      Added: {book.createdAt && book.createdAt.toDate().toLocaleDateString("en-US", timeOptions)}
                    </div>
                    <div className="book-date">
                      Finished:  {book.finishedAt && book.finishedAt.toDate().toLocaleDateString("en-US", timeOptions)}
                    </div>
                    <div className="book-options-container">
                      <div
                        className="edit"
                        onClick={() => {
                          setTitle(book.title);
                          setUpdateId(book.id);
                          setAuthor(book.author);
                          setBookStatus(book.status);
                          setUpdateId(book.id);
                          handleUpdateBook();
                        }}
                      >
                        edit
                      </div>
                      <div
                        className="delete"
                        onClick={() => {
                          deleteDoc(doc(db, 'books', book.id))
                            .then(() => {
                              console.log("Deleted Book");
                            })
                        }}
                      >
                        delete
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;