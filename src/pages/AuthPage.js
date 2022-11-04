import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

const AuthPage = ({setUser}) => {
    const [showSignUp, setShowSignUp] = useState(true);
 return(
        <div>
            <h1>Please Log In or Sign-up!</h1>
            {showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser}/>}

            <button onClick={() => setShowSignUp(!showSignUp)}> 
                {showSignUp ? "Log In" : "Sign Up"}
            </button>
        </div>
    );
};

export default AuthPage;