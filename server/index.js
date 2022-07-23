require('dotenv').config()
const port = process.env.PORT || 3001

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: "EmployeeSystem",
});

app.get('/', (req, res) => {
    res.send("Employee System")
})

app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;

    db.query(
        "INSERT INTO employees (name, age, country) VALUES (?,?,?)",
        [name, age, country],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Value inserted")
            }
        }
    );
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) console.log(err)
        else {
            res.send(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const age = req.body.age;
    db.query(
        "UPDATE employees SET age = ? WHERE id = ?",
        [age, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));