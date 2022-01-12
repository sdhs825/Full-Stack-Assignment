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
    const createDB = "CREATE DATABASE IF NOT EXISTS a4"
    const createUserTable = "CREATE TABLE user(uid INT NOT NULL auto_increment, username VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL UNIQUE, PRIMARY KEY (uid));"
    const createitemsTable = "CREATE TABLE items(id INT NOT NULL AUTO_INCREMENT,uid INT NOT NULL,itemname VARCHAR(255) NOT NULL,PRIMARY KEY (id),FOREIGN KEY (uid) REFERENCES user(uid));"
    const createbookingTable="create table booking(id int not null auto_increment,uid int not null,itemid int not null,startDate DATE NOT NULL,endDate DATE,PRIMARY KEY (id),FOREIGN KEY (uid) REFERENCES user(uid),FOREIGN KEY (itemid) REFERENCES items(id));"
    await connection.query(createDB, (err) => {
        if(err) throw err;
        console.log('created database');
        connection.end()

        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Saikatdas@8377',
            database: 'a4'
        })

        connection.query(createUserTable, (err) => {
            if (err){
                console.log('could not create table user')
            }
            else {
                console.log('Added user table')
            }
        })
        connection.query(createitemsTable, (err) => {
            if (err){
                console.log('could not create table items')
            }
            else {
                console.log('Added item table')
            }
        })
        connection.query(createbookingTable, (err) => {
            if (err){
                console.log('could not create bookings')

            }
            else {
                console.log('Added booking table')
            }
        })
    });
}

app.post('/adduser',async(req,res)=>{ //adding user
    const name=req.body.name; 
    const email=req.body.email;
   

    var q=`insert into user (username,email) values('${name}','${email}')`;

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

app.post('/additem',(req,res)=>{ //adding event
    const uid=req.body.uid;
    const name=req.body.name;

    var q=`insert into items (uid,itemname) values(${uid},'${name}');`;

    connection.query(q,(err,data)=>{
        if (err) {
            console.log(err.sqlMessage);
            res.status(404).send({ "code": 1, "message": err.sqlMessage });
        }
        //console.log('User added');
        else {
            res.status(200).send({"code": 2, "message": 'item added'});
        }
    })

})

app.post('/addbooking',(req,res)=>{ //adding event
    const uid = req.body.uid;
    const id = req.body.itemid;
    const start=req.body.start;
    const end=req.body.end;
    var q3=`SELECT 1
    WHERE not EXISTS
    (
      SELECT * FROM booking
      WHERE '${end}' >= startDate
        AND '${start}' <= endDate
        and uid=${uid} and itemid=${id}
    );`
    

    connection.query(q3,(err,data)=>{
        if (err) {
            
            console.log(err.sqlMessage);
            res.status(404).send({"code": 1, "message": err.sqlMessage});
            
        }
        //console.log('User added');
        else {
            
            if (data.length!=0 && data[0][1] == 1) {
                var q=`insert into booking (uid,itemid,startDate,endDate) values(${uid},${id},'${start}','${end}');`;
                connection.query(q, (err) => {
                    if (err) {
                        console.log(err.sqlMessage);
                        res.status(404).send({ "code": 1, "message": err.sqlMessage });
                    }
                    else {
                        res.status(200).send({"code": 2, "message": 'Booking done'});
                    }
                }) 
            }
            else {
                
                res.status(404).send({ "code": 1, "message": 'Booking Overlap' });
            }
            
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

