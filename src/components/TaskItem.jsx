import React from "react";
import { Edit2, Trash2, Clock } from "lucide-react";

const TaskItem = ({
  task,
  toggleTaskCompletion,
  handleDeleteTask,
  isEditing,
  setEditingTaskId,
}) => {
  // Get due date status
  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;

    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "overdue";
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "tomorrow";
    if (diffDays <= 7) return "upcoming";
    return "future";
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""} priority-${
        task.priority
      } ${dueDateStatus || ""}`}
    >
      <div className="task-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-details">
          <span className="task-text">{task.text}</span>

          <div className="task-meta">
            {task.category && (
              <span className="task-category">{task.category}</span>
            )}

            {task.priority && (
              <span className={`task-priority priority-${task.priority}`}>
                {task.priority}
              </span>
            )}

            {task.dueDate && (
              <span className={`task-due-date ${dueDateStatus || ""}`}>
                <Clock size={12} />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => setEditingTaskId(task.id)} className="edit-btn">
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => handleDeleteTask(task.id)}
          className="delete-btn"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
