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
                            <div className="profile-rank">Book Enjoyer</div>
                        </div>
                        <div className="rank-up-text">Read 3 books to upgrade ranking</div>
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