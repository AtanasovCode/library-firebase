import './styles/auth.css';
import slide from './images/slide.png';
import {
    signInWithEmailAndPassword,
} from 'firebase/auth';

const SignIn = ({
    mail,
    setMail,
    password,
    setPassword,
    auth,
    authClassName,
    handleNewUser,
    handleAuth,
}) => {

    //Sign User In
    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, mail, password)
            .then((cred) => {
                //console.log("user logged in");
                //console.log(cred.user);
                //handleAuth();
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            })
    }


    return (
        <div className={authClassName}>
            <div
                className="icon-close-container"
                onClick={handleAuth}
                id="profile-close"
            >
                <img
                    src={slide}
                    alt="slide"
                    className="slide"
                />
            </div>
            <form className="auth-form" onSubmit={handleSignIn}>
                <div className="auth-heading">
                    <div>Sign In</div>
                </div>
                <input
                    type="email"
                    className="input"
                    name="email"
                    value={mail}
                    placeholder="example@mail.com"
                    onChange={(e) => setMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    className="input"
                    name="password"
                    value={password}
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <div className="auth-btn-container">
                    <button className="auth-btn">
                        Sign In
                    </button>
                    <div className="auth-text" onClick={handleNewUser}>
                        <span>Don't Have An Account?</span>
                        <span className="auth-link">
                            Register Now!
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;