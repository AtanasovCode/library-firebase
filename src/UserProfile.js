import close from './images/close.png';
import {signOut} from 'firebase/auth';

const UserProfile = ({
    handleAuth,
    authClassName,
    auth,
    setMail,
    setPassword,
    setUsername,
    userLoggedIn,
    setUserLoggedIn,
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
        <div className={authClassName} >
            <div
                className="icon-close-container"
                onClick={handleAuth}
            >
                <img
                    src={close}
                    alt="icon icon"
                    className="icon-close icon"
                />
            </div>
            <div>
                Hello, {user.displayName}
            </div>
            <div>
                <input
                    type="button"
                    value="Sign Out"
                    onClick={handleSignOut}
                />
            </div>
        </div>
    );
};

export default UserProfile;