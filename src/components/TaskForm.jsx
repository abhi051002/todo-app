import React, { useState, useEffect } from "react";
import { Calendar, ArrowDownCircle, Filter, Plus } from "lucide-react";

const TaskForm = ({
  categories,
  handleTaskSubmit,
  taskToEdit = null,
  resetTaskToEdit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Set form values if editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setInputValue(taskToEdit.text);
      setDueDate(taskToEdit.dueDate || "");
      setPriority(taskToEdit.priority || "medium");
      setSelectedCategory(taskToEdit.category || "");
      setEditTaskId(taskToEdit.id);
    }
  }, [taskToEdit]);

  const resetForm = () => {
    setInputValue("");
    setDueDate("");
    setPriority("medium");
    setSelectedCategory("");
    setEditTaskId(null);

    // Call the resetTaskToEdit function if it exists
    if (resetTaskToEdit) {
      resetTaskToEdit();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (inputValue.trim()) {
        handleTaskSubmit(
          {
            text: inputValue,
            dueDate,
            priority,
            category: selectedCategory,
          },
          editTaskId
        );
        resetForm();
      }
      setIsLoading(false);
    }, 300); // Small delay for better UX
  };

  return (
    <form onSubmit={onSubmit} className="task-form">
      <div className="form-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="task-input"
        />
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? "..." : editTaskId ? "Update" : "Add"}
        </button>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            <Calendar size={14} /> Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            <ArrowDownCircle size={14} /> Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <Filter size={14} /> Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {editTaskId && (
        <div className="form-row">
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Cancel Editing
          </button>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
