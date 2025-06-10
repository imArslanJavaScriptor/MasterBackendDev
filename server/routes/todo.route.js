import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();
// router.route("/").post(createTodo).get(getAllTodos)
router.route("/createTodo").post(isAuthenticated, createTodo);
router.route("/getTodos").get(getAllTodos);
router.route("/updateTodo/:todoId").put(isAuthenticated, updateTodo);
router.route("/deleteTodo/:todoId").delete(isAuthenticated, deleteTodo);

export default router;
