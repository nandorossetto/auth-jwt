require("dotenv").config();
const app = require("./server");
const PORT = process.env.PORT;
const connection = require("../mongoose/connection");
connection();
app.listen(PORT, () => {
    console.log("#### App listening at port:" + PORT + " ####");
});