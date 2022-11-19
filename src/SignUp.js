import close from './images/close.png'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';


const SignUp = ({
    mail,
    setMail,
    password,
    setPassword,
    auth,
    authClassName,
    handleAuth,
}) => {

    //Sign User Up
    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, mail, password)
            .then((cred) => {
                // console.log("User Created: ");
                //console.log(cred.user);
                setMail("");
                setPassword("");
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
                    type="email"
                    className="sign-up-input input"
                    name="mail"
                    value={mail}
                    placeholder="example@mail.com"
                    onChange={(e) => setMail(e.currentTarget.value)}
                />
                <input
                    type="password"
                    className="sign-up-input input"
                    name="password"
                    value={password}
                    placeholder="password..."
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <div className="sign-up-btn-container auth-btn-container">
                    <button className="sign-up-btn auth-btn">
                        Sign Up
                    </button>
                    <div className="sign-up-text auth-text">
                        Already have an account? Sign In Now!
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;