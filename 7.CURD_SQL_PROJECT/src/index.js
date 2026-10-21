import createUsersTable from "./data/createUserTable.js"; 
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import pool from "./config/db.js"
import userRoutes from "./routes/userroutes.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
//MIDDLEWARE
app.use(express.json());
app.use(cors());

//Routes
app.use("/api",userRoutes);

//Error handling MW
app.use(errorHandler);

// Create users table when the server starts
createUsersTable();
//Testing POSTGRESS CONNECTION
app.get("/", async (req, res) => {
    const result = await pool.query("Select current_database()");
    res.send(`The current database is ${result.rows[0].current_database}`);
})
   
//Server running

app.listen(port,()=>{
    console.log(`Server is running on https:localhost:${port}`)
})