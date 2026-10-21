import express from "express";
import { createUsers, getAllUsers, getUserById, UpdateUser, DeleteUser } from "../controller/userControler.js";
import validateUserInput  from "../middleware/inputValidator.js";
const router = express.Router();

router.post("/user", validateUserInput, createUsers);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUserInput, UpdateUser);
router.delete("/user/:id", DeleteUser);

export default router;