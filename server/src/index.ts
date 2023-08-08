import express from 'express';
const app = express();
import cors from 'cors';
import { dbConnector } from './config/database';
import router from './routes';
import todoRoute from './routes/todoRoutes'
import dotenv from 'dotenv'
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
    res.json({message: "Server is running"});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
})