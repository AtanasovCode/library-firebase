import './styles/auth.css';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';

const SignIn = ({
    mail,
    setMail,
    password,
    setPassword,
    auth,
    authClassName,
}) => {

    //Sign User In
    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, mail, password)
            .then((cred) => {
                //console.log("user logged in");
                //console.log(cred.user);
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            })
    }


    return (
        <div className={authClassName} id="hide">
            <div className="sign-in-heading auth-heading">
                <div>Sign Up</div>
            </div>
            <form className="sign-in-form auth-form" onSubmit={handleSignIn}>
                <input
                    type="email"
                    className="sign-in-input input"
                    name="email"
                    value={mail}
                    placeholder="example@mail.com"
                    onChange={(e) => setMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    className="sign-in-input input"
                    name="password"
                    value={password}
                    placeholder="password..."
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <div className="sign-in-btn-container auth-btn-container">
                    <button className="sign-in-btn auth-btn">
                        Sign In
                    </button>
                    <div className="sign-in-text auth-text">
                        Don't Have An Account? Register Now!
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;