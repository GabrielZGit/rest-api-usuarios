import { Router } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} from "../controllers/users.controller.js";

const router = Router();


// CRUD de usuarios
router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);


// Login
router.post("/login", login);


export default router;