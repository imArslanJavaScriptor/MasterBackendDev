import express from "express";
import { createTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router()
// router.route("/").post(createTodo).get(getAllTodos)
router.route("/createTodo").post(createTodo)
router.route("/getTodos").get(getAllTodos)
router.route("/updateTodo/:todoId").put(updateTodo)

export default router 