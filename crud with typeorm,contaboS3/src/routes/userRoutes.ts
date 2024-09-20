// import { Router } from "express";
// import {
//   createUserHandler,
//   getAllUsersHandler,
//   getUserByIdHandler,
//   updateUserHandler,
//   deleteUserHandler,
// } from "../controllers/userController";

// const router = Router();

// router.post("/", createUserHandler);

// router.get("/", getAllUsersHandler);
// router.get("/:id", getUserByIdHandler);
// router.put("/:id", updateUserHandler);
// router.delete("/:id", deleteUserHandler);

// export default router;
import { Router } from 'express';
import { updateUserHandler, getAllUsersHandler, getUserByIdHandler, createUserHandler, deleteUserHandler } from '../controllers/userController';

const router = Router();

router.post('/users', createUserHandler);  // Create user
router.get('/users', getAllUsersHandler);  // Get all users
router.get('/users/:id', getUserByIdHandler);  // Get user by ID
router.patch('/users/:id', updateUserHandler);  // Update user (PATCH)
router.delete('/users/:id', deleteUserHandler);  // Delete user

export default router;