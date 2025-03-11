import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import TaskManagement from "./components/TaskManagement";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./style.css";

const App = () => {
  // State management
  const [tasks, setTasks] = useLocalStorage("todoTasks", []);
  const [categories, setCategories] = useLocalStorage("todoCategories", [
    "Personal",
    "Work",
    "School",
    "Health",
  ]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  // Calculate statistics when tasks change
  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    });
  }, [tasks]);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter and sort tasks for display
  const getFilteredTasks = () => {
    return tasks
      .filter((task) => {
        // Search filter
        const matchesSearch = task.text
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Status filter
        const matchesFilter =
          filter === "all" ||
          (filter === "active" && !task.completed) ||
          (filter === "completed" && task.completed);

        // Category filter
        const matchesCategory =
          !selectedCategory || task.category === selectedCategory;

        return matchesSearch && matchesFilter && matchesCategory;
      })
      .sort((a, b) => {
        // Sort by completion status, then by priority, then by due date
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }

        const priorityOrder = { high: 0, medium: 1, low: 2 };

        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }

        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  };

  // Add or update task
  const handleTaskSubmit = (taskData, editTaskId) => {
    if (editTaskId) {
      // Update existing task
      setTasks(
        tasks.map((task) => {
          if (task.id === editTaskId) {
            return {
              ...task,
              ...taskData,
              updatedAt: new Date().toISOString(),
            };
          }
          return task;
        })
      );
      showNotification("Task updated successfully");
    } else {
      // Add new task
      const newTask = {
        id: `task-${Date.now()}`,
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks([...tasks, newTask]);
      showNotification("Task added successfully");
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updated = { ...task, completed: !task.completed };
          if (updated.completed) {
            updated.completedAt = new Date().toISOString();
          } else {
            delete updated.completedAt;
          }
          return updated;
        }
        return task;
      })
    );
    showNotification("Task status updated");
  };

  // Delete task
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      showNotification("Task deleted successfully");
    }
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    let completedTasks = 0;
    tasks.map((task) => {
      return task.completed ? completedTasks++ : 0;
    });
    if (completedTasks == 0) {
      showNotification("No Completed tasks to be cleared", "error");
      return;
    }
    if (
      window.confirm("Are you sure you want to remove all completed tasks?")
    ) {
      setTasks(tasks.filter((task) => !task.completed));
      showNotification("Completed tasks cleared");
    }
  };

  // Add new category
  const handleAddCategory = () => {
    const category = prompt("Enter new category name:");
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="todo-app-container">
      <Header />

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <Dashboard stats={stats} />

      <div className="main-content">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleAddCategory={handleAddCategory}
          clearCompletedTasks={clearCompletedTasks}
        />

        <TaskManagement
          tasks={filteredTasks}
          categories={categories}
          handleTaskSubmit={handleTaskSubmit}
          toggleTaskCompletion={toggleTaskCompletion}
          handleDeleteTask={handleDeleteTask}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          selectedCategory={selectedCategory}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
