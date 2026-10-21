import pool from "../config/db.js";

const createUsersTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

export default createUsersTable;