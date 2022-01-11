import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import "./calendar.css";
import {addEvent, getEvent} from "../../Services/services";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function Event(){
    const classes = useStyles();
    const [date, setDate] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [endDate, setEndDate] = useState(new Date());
    const [descr, setDescr] = useState("");
    const [eventList, setEventList] = useState([]);

    const toSQLDate = (date) => {
        return date.toISOString().slice(0, 10).replace('T', ' ');
    }

    const getEventHandler = async () => {
        const data = {
            "uid": localStorage.getItem("uid"),
            "date": toSQLDate(date)
        }
        console.log(data);
        const res = await getEvent(data);
        if(res !== null){
            if (res.code === 2){
                console.log(res.data);
                setEventList(res.data);
            }
            else{
                //err
            }
        }
        else{
            //err
        }
    }

    const addEventHandler = async () => {
        const data = {
            "name": eventName,
            'occurence': descr,
            'start': toSQLDate(date),
            'end': toSQLDate(endDate),
            "uid": localStorage.getItem("uid")
        }
        const res = await addEvent(data);
        console.log(res);
        if(res !== null){
            if (res.code === 2){
                //success
            }
            else{
                //err
            }
        }
        else{
            //err
        }
    }

    return (
        <div className='event-wrapper'>
            <div className='calendar-wrapper'>
                <Calendar
                    value={date}
                    onChange={(val) => {
                        setDate(val);
                        setEndDate(val);
                    }}
                />
                <Button variant="contained" color="primary" onClick={getEventHandler}>
                    get events
                </Button>
            </div>
            <div className='addevent-wrapper'>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField label="set event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    <TextField multiline maxRows={4} minRows={2} label="add description" value={descr} onChange={(e) => {
                        setDescr(e.target.value);
                    }} />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="end date"
                            inputFormat="dd/MM/yyyy"
                            value={endDate}
                            onChange={(val) => setEndDate(val)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" color="primary" onClick={addEventHandler}>add event</Button>
                </form>
            </div>
            <div className='eventlist-wrapper'>
                {(eventList === null || eventList.length === 0 || !Array.isArray(eventList)) ? <></> :
                    (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>name</TableCell>
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Start Date</TableCell>
                                        <TableCell align="right">End Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {eventList.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.eventname}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">{row.startTime.slice(0, 10)}</TableCell>
                                            <TableCell align="right">{row.endTime.slice(0, 10)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
            </div>
        </div>
    )
}

export default Event;