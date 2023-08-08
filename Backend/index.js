
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const { dbConnector } = require('./config/database');
const router = require('./routes/index');
const todoRoute = require('./routes/todoRoutes');
dotenv.config();

// midddleware
app.use(express.json());
app.use(cors());

// db connections
dbConnector();

// setting router
app.use('/auth', router);
app.use('/todo', todoRoute);

app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
})