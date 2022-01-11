const express =require('express');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');


const app= express();
const saltRounds = 2;
app.use(express.json());

var connection = mysql.createConnection({ //connection of database
    host:'localhost',
    user:'root',
    password: 'Saikatdas@8377'
})

const createDB = async () => {  //creating the database if not created already
    const createDB = "CREATE DATABASE IF NOT EXISTS a3"
    const createUserTable = "CREATE TABLE user(uid INT NOT NULL auto_increment, username VARCHAR(255) NOT NULL, gender enum('Male','Female'), email VARCHAR(255) NOT NULL UNIQUE, PRIMARY KEY (uid));"
    const createEventsTable = "CREATE TABLE events(id INT NOT NULL AUTO_INCREMENT,uid INT NOT NULL,eventname VARCHAR(255) NOT NULL,description enum('Weekly','Monthly','Yearly','Onetime') not null,startTime DATE NOT NULL,endTime DATE,PRIMARY KEY (id),FOREIGN KEY (uid) REFERENCES user(uid));"

    await connection.query(createDB, (err) => {
        if(err) throw err;
        console.log('created database');
        connection.end()

        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Saikatdas@8377',
            database: 'a3'
        })

        connection.query(createUserTable, (err) => {
            if (err){
                console.log('could not create table user')
            }
        })
        connection.query(createEventsTable, (err) => {
            if (err){
                console.log('could not create table events')
            }
        })
    });
}

app.post('/adduser',async(req,res)=>{ //adding user
    const name=req.body.name; 
    const gender=req.body.gender;
    const email=req.body.email;
   

    var q=`insert into user (username,gender,email) values('${name}','${gender}','${email}')`;

    connection.query(q,(err,data)=>{
        if(err) {
            console.log(err.sqlMessage);
            res.status(404).send({"code":1,"message":err.sqlMessage})
        }
        //console.log('User added');
        else{
            res.status(200).send({ "code": 2, "message": "User added" });
        }
    })

})

app.post('/addevent',(req,res)=>{ //adding event
    const uid=req.body.uid;
    const name=req.body.name;
    const occurence=req.body.occurence;
    const start=req.body.start;
    const end=req.body.end;

    var q=`insert into events (uid,eventname,description,startTime,endTime) values(${uid},'${name}','${occurence}','${start}','${end}');`;

    connection.query(q,(err,data)=>{
        if (err) {
            console.log(err.sqlMessage);
            res.status(404).send({ "code": 1, "message": err.sqlMessage });
        }
        //console.log('User added');
        else {
            res.status(200).send({"code": 2, "message": 'event added'});
        }
    })

})



const PORT = process.env.PORT || 8080;
const callback = () => {
    console.log('server listening to port', PORT);
    connection.connect((err)=>{
        if(err) throw err;
        console.log('Database Connected');
        createDB();
    })
    
}
app.listen(PORT, callback)

