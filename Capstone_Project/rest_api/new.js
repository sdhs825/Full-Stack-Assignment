const express =require('express');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');


const app= express();
const saltRounds = 2;
app.use(express.json());

const createDB = async () => {
    const createDB = "CREATE DATABASE IF NOT EXISTS task"
    const createUserTable = "CREATE TABLE user(uid INT NOT NULL auto_increment, username VARCHAR(255) NOT NULL, gender VARCHAR(255), email VARCHAR(255) NOT NULL UNIQUE,password varchar(255) not null, PRIMARY KEY (uid));"
    const createEventsTable = "CREATE TABLE events(id INT NOT NULL AUTO_INCREMENT,uid INT NOT NULL,eventname VARCHAR(255) NOT NULL,description varchar(255) not null,startTime DATE NOT NULL,endTime DATE,PRIMARY KEY (id),FOREIGN KEY (uid) REFERENCES user(uid));"

    await connection.query(createDB, (err) => {
        if(err) throw err;
        console.log('created database');
        connection.end()

        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Saikatdas@8377',
            database: 'task'
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

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Saikatdas@8377',
    database:'task'
})

app.post('/adduser',async(req,res)=>{
    const name=req.body.name;
    const gender=req.body.gender;
    const email=req.body.email;
    var password = req.body.password;
    password = await bcrypt.hash(password, saltRounds);

    var q=`insert into user (username,gender,email,password) values('${name}','${gender}','${email}','${password}')`;

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

app.post('/addevent',(req,res)=>{
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

app.post('/auth', async(req, res) => {  //for login page
    const email = req.body.email;
    const password = req.body.password;
    var q = `select password,uid from user where email='${email}';`
    connection.query(q, async(err, data) => {
        if (err) {
            res.status(404).send({ "code": 1, "message": err.sqlMessage });
        }
        else {
            if (data.length == 0) res.status(404).send({ "code": 1, "message": "No User" });
            else {
                console.log(data[0]['uid']);
                const match = await bcrypt.compare(password, data[0]['password']);
                if (!match) {
                    res.status(404).send({ "code": 1, "message": "password not matched" });
                }
                else {
                    res.status(200).send({"code": 2, "message": "password matched","uid":data[0]['uid']});
                }
            }
        }
    })

})


app.get('/event/:id',(req,res)=>{
    const id=req.params.id;
    
    var q=`select * from events where uid=${id};` 
    connection.query(q,(err,data)=>{
        if(err){
            console.log(err.sqlMessage)
        }
        else{
            if(data.length==0){
                res.send("No data")
            }
            else
            res.send(data);
        }
    })
})


app.post('/event', (req, res) => {
    const date = req.body.date;
    const uid = req.body.uid;
  
    var q=`select * from events where uid= ${uid} && startTime='${date}';` 
    connection.query(q,(err,data)=>{
        if(err){
            console.log(err.sqlMessage);
            res.status(404).send({ "code": 1, "message": err.sqlMessage });
        }
        else{
            if(data.length==0){
                res.status(404).send({ "code":1, "message": "No data" })
            }
            else
                res.status(200).send({ "code":2, "message": "events found","data":data });
        }
    })
})


const PORT = process.env.PORT || 8080;
const callback = () => {
    console.log('server listening to port', PORT);
    connection.connect((err)=>{
        if(err) throw err;
        console.log('Database Connected');
    })
    
}
app.listen(PORT, callback)

