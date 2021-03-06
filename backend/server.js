const  express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const errres = require("./utils/errorresponse")
require('dotenv').config();

const app = express();
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());
const uri= process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.once('open',()=>{
    console.log("Server connected to database");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/users',usersRouter);
app.use('/exercises',exercisesRouter);
app.use("*",(req,res)=> res.status(404).json(errres("No Content found", "Wrong URL info")))
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});
