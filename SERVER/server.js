const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const booksdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.password,
  database: "mysql_crud",
});

booksdb.connect((err) => {
  if (err) return err;
  else return console.log("Connected to Database");
});

app.get("/", (req, res) => [
  res.status(200).json({
    status: "Success",
    message: "API is working well",
  }),
]);

app.get("/books", (req, res) => {
  const select = "SELECT * FROM mysql_crud.books";
  booksdb.query(select, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const select =
    "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  booksdb.query(select, [values], (err, data) => {
    // console.log(data);
    if (err) return err;
    else return res.json("Book Created Successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const select = " DELETE FROM books WHERE id = ? ";

  booksdb.query(select, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const select =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  booksdb.query(select, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
