const {mongoConnect, store} = require("./utils/databaseUtils");
const session = require("express-session");
//const scholarItemController = require("./controllers/scholarItemController");
const express = require('express');
const app = express();
const scholarItem = require("./routes/scholarItem");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
  store: store
}));

app.use(scholarItem);
const PORT = 3000;

mongoConnect(() => {
  console.log("Mongo Started Successfully");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
