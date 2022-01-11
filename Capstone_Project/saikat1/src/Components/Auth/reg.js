import React, {useState} from 'react';
import { TextField, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import {addUser} from  "../../Services/services.js"

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
        '& .MuiFormGroup-root': {
            display: 'inline !important'
        },
        '& .MuiFormControlLabel-root': {
            color: 'black'
        }
    },
}));

function Reg(){
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState('Female');

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
        console.log(name, email, password, gender);
        var data = {
            "name": name,
            "email": email,
            "password": password,
            "gender": gender
        }
        const res = await addUser(data);
        console.log(res);
    }

    return (
        <div className="reg-sub-wrapper">
            <h1>SIGN UP</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField label="Create Username" onChange={(e) => setName(e.target.value)} />
                <TextField 
                    value={showPassword ? password : "•".repeat(password.length)}
                    onChange={handlePassword}
                    type={showPassword ? "text" : "password"}
                    label="Create Password" 
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
                <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
                <RadioGroup
                    aria-label="gender"
                    defaultValue="Female"
                    name="radio-buttons-group"
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                >
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={handleSubmit}>SIGN UP</Button>
            </form>
        </div>
    )
}

export default Reg;