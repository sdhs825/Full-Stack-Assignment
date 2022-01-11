import {useState} from 'react';
import { TextField, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import {authUser} from "../../Services/services";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        '& > *': {
            width: '300px',
            color: "white",
            display: 'grid',
        },
        '& .MuiTextField-root': {
            color: "black",
            margin: '10px'
        },
        '& .MuiFormLabel-root': {
            color: "black"
        },
        '& .MuiInput-input': {
            color: "black",
            width: 300,
            fontSize: 18,
        },
        '& .MuiButtonBase-root': {
            width: 300,
            height: 60,
            borderRadius: 30,
            fontSize: 18,
            fontFamily: 'Helvetica',
            backgroundColor: 'rgba(63, 184, 232, 0.9)'
        }
        
    },
}));

function Login(){
    let navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword);
    }

    const handlePassword = (e) => {
        const input = e.target;
        var newPassword = input.value;
        if(newPassword.length > password.length){
            setPassword(password + newPassword[newPassword.length - 1]);
        }
        else if(newPassword.length < password.length){
            setPassword(password.slice(0, newPassword.length))
        }
    }

    const handleSubmit = async () => {
        console.log(email, password);
        var data = {
            "email": email,
            "password": password
        }
        const res = await authUser(data);
        if(res !== null){
            if (res.code === 2){
                localStorage.setItem("uid", res.uid);
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                navigate("/calendar")
            }
            else{
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
        else{
            toast.error("error in login", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    return (
        <div className="login-sub-wrapper">
            <h1>LOG IN</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
                <TextField 
                    value={showPassword ? password : "•".repeat(password.length)}
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                    label="Password" 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <button
                                    className="password_toggle_icon"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </button>
                            </InputAdornment>
                        )
                        }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} >LOG IN</Button>
            </form>
        </div>
    )
}

export default Login;