import axios from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:8080"
})


//google-chrome --disable-web-security --user-data-dir="/home/saikat/.config/google-chrome/Default" run in terminal

const headers = {
    "Content-type": "application/json"
}

export const addUser = (data) => HTTP.post("/adduser", JSON.stringify(data), {
        headers: headers
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    })

export const authUser = (data) => HTTP.post("/auth", JSON.stringify(data), {
        headers: headers
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    })

export const getEvent = (data) => HTTP.post("/event", JSON.stringify(data), {
        headers: headers
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    })

export const addEvent = (data) => HTTP.post("/addevent", JSON.stringify(data), {
        headers: headers
    }).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
        return null;
    })

