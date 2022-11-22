import slide from './images/slide.png';
import leave from './images/leave.png';
import { signOut } from 'firebase/auth';
import './styles/user-profile.css';

const UserProfile = ({
    handleAuth,
    authClassName,
    auth,
    setMail,
    setPassword,
    setUsername,
    userLoggedIn,
    setUserLoggedIn,
    library,
    booksRead,
    getUserRank,
    user,
}) => {

    //Sign User Out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                handleAuth();
                setMail("");
                setPassword("");
                setUsername("");
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const calculateBooksLeft = () => {
        let rank = getUserRank();
        if(rank === "Book Newbie") {
            return 1;
        }else if(rank === "Book Amateur") {
            return 3 - booksRead;
        }else if(rank === "Book Enjoyer") {
            return 5 - booksRead;
        }else if(rank === "Book Worm") {
            return 10 - booksRead;
        }else if(rank === "Book Surgeon") {
            return 15 - booksRead;
        }else if(rank === "Book Magician") {
            return 20 - booksRead;
        }else if(rank === "Book Master") {
            return 30 - booksRead;
        }
    }


    return (
        <div className="user-profile-container">
            <div
                className="icon-close-container"
                id="profile-close"
                onClick={handleAuth}
            >
                <img
                    src={slide}
                    alt="icon icon"
                    className="slide"
                />
            </div>
            <div className="profile-container">A</div>
            <div className="profile-info-container">
                <div className="profile-status-container">
                    <div className="profile-books-status">
                        <div className="total-books-container profile-books">
                            <div className="book-text">Total Books</div>
                            <div className="profile-book-number">{library.length}</div>
                        </div>
                        <div className="books-finished-container profile-books">
                            <div className="book-text">Finished</div>
                            <div className="profile-book-number">{booksRead}</div>
                        </div>
                    </div>
                    <div className="profile-ranking">
                        <div className="profile-rank-container">
                            <div className="rank-text">rank:</div>
                            <div className="profile-rank">{getUserRank()}</div>
                        </div>
                        <div className="rank-up-text">
                            Read <span>{calculateBooksLeft()}</span> more books to upgrade ranking
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-greet-container">
                <div className="sign-out-btn-container" onClick={handleSignOut}>
                    <img
                        src={leave}
                        alt="leave icon"
                        className="leave-icon"
                    />
                    <input
                        type="button"
                        value="Sign Out"
                        className="sign-out-btn"
                    />
                </div>
                <div className="profile-name">
                    {user.displayName}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;