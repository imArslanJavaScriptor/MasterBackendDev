import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const todoHandler = async () => {
    if (!title.trim() || !description.trim()) {
      return toast.error("Please fill in both title and description");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo/createTodo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Todo added successfully!");
        setTitle("");
        setDescription("");
        getTodos(); // refresh list after new todo
      } else {
        toast.error("Failed to create todo");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/todo/getTodos",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTodos(res.data.todos); // assuming your backend sends todos array
      } else {
        toast.error("Failed to fetch todos");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching todos");
    }
  };

  const updateTodos = async (id, updatedTitle, updatedDescription) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/todo/updateTodo/${id}`,
        { title: updatedTitle, description: updatedDescription },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Todo updated successfully");
        getTodos(); // Refresh list
      } else {
        toast.error("Failed to update todo");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating todo");
    }
  };

  const deleteTodos = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/todo/deleteTodo/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Todo deleted successfully");
        getTodos(); // Refresh list
      } else {
        toast.error("Failed to delete todo");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting todo");
    }
  };

  useEffect(() => {
    getTodos(); // ✅ CALL the function
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-gray-800 text-white">
      <Navbar />

      <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold text-center mb-8 text-indigo-400">
          Add a New Todo
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todo description"
            className="w-full px-4 py-3 h-32 bg-gray-800 text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <button
            onClick={todoHandler}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-10 px-6">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-300">
          Your Todos
        </h2>

        {todos.length === 0 ? (
          <p className="text-gray-400">No todos yet. Add some!</p>
        ) : (
          <ul className="space-y-4">
            <ul className="space-y-4">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  {editingId === todo._id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full bg-gray-700 px-2 py-1 rounded text-white mb-2"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full bg-gray-700 px-2 py-1 rounded text-white mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateTodos(todo._id, editTitle, editDescription)
                          }
                          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-indigo-400">
                        {todo.title}
                      </h3>
                      <p className="text-gray-300">{todo.description}</p>
                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={() => {
                            setEditingId(todo._id);
                            setEditTitle(todo.title);
                            setEditDescription(todo.description);
                          }}
                          className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodos(todo._id)}
                          className="text-sm bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
