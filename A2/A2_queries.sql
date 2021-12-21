 -- Created a user table with user id , name , gender and email
 CREATE TABLE user(
	uid INT NOT NULL auto_increment,
    name1 VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (uid)
 );
 
 -- Altered the gender column of user table from string to enum 
 ALTER TABLE user 
 MODIFY gender ENUM('Male','Female') NOT NULL;
 
 -- Created a table for events with event id,user id, Event name, and its time
 CREATE TABLE events(
	id INT NOT NULL AUTO_INCREMENT,
    uid INT NOT NULL,
    name2 VARCHAR(255) NOT NULL,
    occurence ENUM('Yearly','Onetime'),
    startDate DATE NOT NULL,
    endDate DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (uid) REFERENCES user(uid)
);

-- Inserted values in user table 
INSERT INTO user (name1,Gender,Email)
VALUES ('Saikat Das','Male','saikat@gmail.com'),
		('Arpan Saha','Male','arpan@gmail.com'),
        ('Sabuj Das','Male','sabuj@gmail.com'),
        ('Iti Das','Female','iti@gmail.com'),
        ('Akshita Mondal','Female','akshita@gmail.com');

-- More users
INSERT INTO user (name1,Gender,Email)
VALUES ('Asit Das','Male','asit@gmail.com'),
		('Arpita Ghosh','Female','arpita@gmail.com'),
        ('Sandi Dutta','Male','sandi@gmail.com');
   
-- Visualising the user table after modification
SELECT uid AS 'User ID',name1 AS 'Name',gender AS 'Gender',email AS 'Email ID' FROM user;

-- Changing email to unique in user as Email id per user should be unique
ALTER TABLE user
MODIFY email VARCHAR(255) NOT NULL UNIQUE;


-- Inserting values into events table
INSERT INTO events (uid,name2,occurence,startDate,endDate)
VALUES (1,'Event1','Onetime','22/11/12','22/12/12'),
		(3,'Event2','Onetime',curdate(),NULL),
        (4,'Event9','Onetime',curdate(),'22/01/25'),
        (3,'Event21','Onetime',curdate(),NULL),
        (2,'Event10','Onetime','22/01/24','22/01/25'),
        (9,'Event11','Onetime',curdate(),'22/01/22'),
        (8,'Event7','Yearly','21/12/21','21/12/30'),
        (3,'Event12','Onetime','21/12/12',NULL),
        (1,'Event13','Yearly','21/12/14',NULL),
        (4,'Event20','Onetime',curdate(),'22/01/25'),
        (1,'Event22','Yearly','21/12/21','21/12/30'),
        (1,'Event23','Onetime',curdate(),NULL),
        (2,'Event14','Onetime','21/12/12',NULL),
        (1,'Event24','Onetime',curdate(),NULL),
        (3,'Event8','Yearly','21/12/20','21/12/25'),
        (8,'Event3','Onetime',curdate(),NULL),
        (1,'Event19','Onetime',curdate(),NULL),
        (5,'Event15','Yearly','21/12/21','21/12/30'),
        (1,'Event10','Onetime','22/01/24','22/01/25'),
        (3,'Event8','Yearly','21/12/20','21/12/25'),
        (5,'Event25','Onetime',curdate(),'22/01/25'),
        (2,'Event26','Onetime',curdate(),NULL),
        (7,'Event27','Yearly','21/12/21','21/12/30'),
        (1,'Event16','Yearly',curdate(),NULL),
        (9,'Event28','Onetime',curdate(),'22/01/25'),
        (1,'Event29','Onetime',curdate(),NULL),
        (7,'Event8','Yearly','21/12/20','21/12/25'),
        (9,'Event30','Onetime',curdate(),NULL),
        (1,'Event17','Onetime',curdate(),'22/01/01'),
        (8,'Event18','Yearly','21/12/20',NULL);

-- Visualising the events table
SELECT 
	id AS 'Event ID',
    uid AS 'User ID',
    name2 AS 'Event Name',
    occurence AS 'Occurence',
    startDate AS 'Start Date',
    endDate AS 'End Date'
    from events;

-- Every ongoing event if End Date is NUll it is not considered
SELECT 
	id AS 'Event ID',
    uid AS 'User ID',
    name2 AS 'Event Name',
    occurence AS 'Occurence',
    startDate AS 'Start Date',
    endDate AS 'End Date'
    from events
where startDate<=curdate() AND endDate>=curdate();

-- Getting all users from a list of (1,2,4,7)
SELECT uid AS 'User ID',name1 AS 'Name',gender AS 'Gender',email AS 'Email ID' FROM user
where uid in (1,2,4,7);

-- Getting all events for user 1
SELECT 
	id AS 'Event ID',
    uid AS 'User ID',
    name2 AS 'Event Name',
    occurence AS 'Occurence',
    startDate AS 'Start Date',
    endDate AS 'End Date'
    from events
where uid=1;

-- Getting all events for next 7 days
SELECT 
	id AS 'Event ID',
    uid AS 'User ID',
    name2 AS 'Event Name',
    occurence AS 'Occurence',
    startDate AS 'Start Date',
    endDate AS 'End Date'
    from events
WHERE startDate BETWEEN curdate() AND DATE_ADD(curdate(), INTERVAL 7 DAY);



 