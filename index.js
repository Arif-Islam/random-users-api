const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/v1/users.route");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/user", usersRoutes);

app.get("/", (req, res) => {
    res.send('Hello from random user api.');
})

app.listen(port, () => {
    console.log('Listening on port ', port);
})