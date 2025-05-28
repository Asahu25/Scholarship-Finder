const {mongoConnect} = require("./utils/databaseUtils");

const express = require('express');
const app = express();

//app.use(express.urlencoded());

const PORT = 3000;

mongoConnect((client)=>{
    console.log(client);
    app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
})