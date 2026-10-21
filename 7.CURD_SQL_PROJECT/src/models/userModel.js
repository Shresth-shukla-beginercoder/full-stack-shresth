import pool from "../config/db.js";
export const getAllUsers = async () => {
const result = await pool.query("SELECT * FROM users");
return result.rows;
};
export const createUsers = async (name, email, password) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password]
    );

    return result.rows[0];
};
export const getUserById = async (id) => {
const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
return result.rows[0]; 
};
export const UpdateUser = async (id, name, email) => {
const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
return result.rows[0];
};
export const DeleteUser = async (id) => {
const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
return result.rows[0];
};