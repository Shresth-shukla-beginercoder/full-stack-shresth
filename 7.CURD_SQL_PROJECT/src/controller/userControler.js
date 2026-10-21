import {
    createUsers as createUserModel,
    getAllUsers as getAllUsersModel,
    getUserById as getUserByIdModel,
    UpdateUser as updateUserModel,
    DeleteUser as deleteUserModel,
} from "../models/userModel.js";



// Standerised response format
const sendResponse = (res, statusCode, success, message, data) => {
    res.status(statusCode).json({
        success,
        message,
        data
    });
};

export const createUsers = async (req, res, next) => {
    try {
       const { name, email, password } = req.body;

const user = await createUserModel(name, email, password);
        sendResponse(res, 201, true, "User created successfully", user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersModel();
        sendResponse(res, 200, true, "Users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdModel(id);
        if (!user) {
            return sendResponse(res, 404, false, "User not found", null);
        }
        sendResponse(res, 200, true, "User retrieved successfully", user);
    } catch (error) {
        next(error);
    }
};

export const UpdateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await updateUserModel(id, name, email);
        if (!user) {
            return sendResponse(res, 404, false, "User not found", null);
        }
        sendResponse(res, 200, true, "User updated successfully", user);
    } catch (error) {
        next(error);
    }
};

export const DeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUserModel(id);
        if (!user) {
            return sendResponse(res, 404, false, "User not found", null);
        }
        sendResponse(res, 200, true, "User deleted successfully", user);
    } catch (error) {
        next(error);
    }
};