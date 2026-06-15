create database school_database;
use school_database;
create table users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);
create table tasks(
	task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

select * from users;
select * from tasks;