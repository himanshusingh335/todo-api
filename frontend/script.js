document.addEventListener("DOMContentLoaded", function () {
    // Updated API URL to match Nginx reverse proxy's configuration
    const API_URL = "/api/todos";

    // Function to fetch and display all todos
    async function fetchTodos() {
        console.log("Attempting to fetch todos from:", API_URL);
        try {
            const response = await fetch(API_URL);
            console.log("Fetch response status:", response.status);

            if (!response.ok) {
                console.error("Failed to fetch todos:", response.statusText);
                return;
            }

            const todos = await response.json();
            console.log("Fetched todos:", todos);

            // Clear existing todos from the display and render the new ones
            const todoList = document.getElementById("todo-list");
            todoList.innerHTML = ""; // Clear previous content
            todos.forEach(todo => {
                const todoItem = document.createElement("li");
                todoItem.textContent = `${todo.id}: ${todo.task}`;

                // Add delete button to each todo item
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteTodo(todo.id);
                todoItem.appendChild(deleteButton);

                todoList.appendChild(todoItem);
            });
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    // Function to add a new todo
    async function addTodo(task) {
        console.log("Attempting to add todo:", task);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task }),
            });
            console.log("Add todo response status:", response.status);

            if (!response.ok) {
                console.error("Failed to add todo:", response.statusText);
                return;
            }

            const newTodo = await response.json();
            console.log("Added new todo:", newTodo);

            // Refresh the list of todos
            fetchTodos();
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    // Function to delete a todo by ID
    async function deleteTodo(id) {
        console.log("Attempting to delete todo with ID:", id);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            console.log("Delete todo response status:", response.status);

            if (!response.ok) {
                console.error("Failed to delete todo:", response.statusText);
                return;
            }

            console.log("Deleted todo with ID:", id);

            // Refresh the list of todos
            fetchTodos();
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    // Event listeners for add button and delete button
    const addButton = document.getElementById("add-button");
    if (addButton) {
        addButton.addEventListener("click", () => {
            const taskInput = document.getElementById("task-input");
            const task = taskInput.value.trim();
            if (task) {
                addTodo(task);
                taskInput.value = ""; // Clear input after adding
            } else {
                console.warn("Task input is empty, not adding.");
            }
        });
    } else {
        console.error("Add button not found.");
    }

    // Initial load of todos when page loads
    fetchTodos();
});