import "./auth.css";
import Login from "./login.js";
import Register from "./reg.js";

function Auth(){

    return (
        <div className='auth-wrapper'>
            <Login />
            <Register />
        </div>
    )
}

export default Auth;