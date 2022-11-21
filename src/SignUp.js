import close from './images/close.png'
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';


const SignUp = ({
    regMail,
    setRegMail,
    regPassword,
    setRegPassword,
    username,
    setUsername,
    auth,
    authClassName,
    handleAuth,
    handleNewUser,
    user,
    setUser,
}) => {

    //Sign User Up
    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, regMail, regPassword)
            .then((currentUser) => {
                updateProfile(auth.currentUser, {
                    displayName: username,
                    userId: currentUser.uid,
                })
                .then(() => {
                    console.log("profile updated");
                })
            })
            .catch((err) => {
                alert(err.message);
                console.log(err.message);
            })
    }


    return (
        <div className={authClassName}>
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
            <form className="sign-up-form auth-form" onSubmit={handleSignUp}>
                <div className="sign-up-heading auth-heading">
                    <div>Sign Up</div>
                </div>
                <input
                    type="text"
                    className="input"
                    name="username"
                    value={username}
                    placeholder="Username..."
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <input
                    type="email"
                    className="sign-up-input input"
                    name="mail"
                    value={regMail}
                    placeholder="example@mail.com"
                    onChange={(e) => setRegMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    className="sign-up-input input"
                    name="password"
                    value={regPassword}
                    placeholder="Password..."
                    onChange={(e) => setRegPassword(e.currentTarget.value)}
                />
                <div className="sign-up-btn-container auth-btn-container">
                    <button className="sign-up-btn auth-btn">
                        Sign Up
                    </button>
                    <div className="auth-text">
                        <span>Already Have An Account?</span>
                        <span className="auth-link" onClick={handleNewUser}>
                            Sign Up Now!
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;