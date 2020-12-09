const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1111;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: conf.host,
    
    user: conf.user,
    
    password: conf.password,
    
    port: conf.port,
    
    database: conf.database
    
    });

connection.connect();

app.get('/rank', (req, res) => {
    connection.query(
        'SELECT *, rank() over(order by time asc) AS ranking FROM GAMERECORD LIMIT 20',
        (err, rows, fields) => {
            res.send(rows);
            }
    )
});
app.post('/regist', (req, res) => {
    let sql = 'INSERT INTO GAMERECORD VALUES (?, ?, null)';
    
    let name = req.body.name;
    let time = req.body.time;
    let params = [time, name];
    console.log(params);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));