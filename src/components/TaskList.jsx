import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskCompletion, handleDeleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);

  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <p>No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          handleDeleteTask={handleDeleteTask}
          isEditing={task.id === editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      ))}
    </ul>
  );
};

export default TaskList;
