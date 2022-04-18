const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "curd_contact",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("-> Database Connected");
});

app.get("/api/get", (req, res) => {
  const sqlget = "SELECT * FROM contact_db";
  db.query(sqlget, (err, resault) => {
    res.send(resault);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlIsert =
    "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlIsert, [name, email, contact], (error, resault) => {
      if (error) {
        console.log(error);
      }
    })
});


app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove =
    "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, resault) => {
      if (error) {
        console.log(error);
      }
      
      
    })
});






























app.get("/", (req, res) => {
  //   const sqlInsert =
  //     "INSERT INTO contact_db (name, email, contact) VALUES ('wildan ganteng', 'mohwildanwildan@gmail.com', '12334458')";
  //   db.query(sqlInsert, (err, resault) => {
  //     console.log("error", err);
  //     console.log("resault", resault);
  //     res.send("hello");
  //   });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
