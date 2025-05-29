const {mongoConnect} = require("./utils/databaseUtils");
//const scholarItemController = require("./controllers/scholarItemController");
const express = require('express');
const app = express();
const scholarItem = require("./routes/scholarItem");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(scholarItem);
const PORT = 3000;

mongoConnect(() => {
  console.log("Mongo Started Successfully");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
