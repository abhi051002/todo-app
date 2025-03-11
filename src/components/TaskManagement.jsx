import React, { useState } from "react";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";

const TaskManagement = ({
  tasks,
  categories,
  handleTaskSubmit,
  toggleTaskCompletion,
  handleDeleteTask,
  searchQuery,
  setSearchQuery,
  filter,
  selectedCategory,
}) => {
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="task-management">
      <TaskForm
        categories={categories}
        handleTaskSubmit={handleTaskSubmit}
        taskToEdit={taskToEdit}
        resetTaskToEdit={() => setTaskToEdit(null)}
      />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="tasks-container">
        <h2>
          {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks
          {selectedCategory && ` - ${selectedCategory}`}
          {searchQuery && ` - Search: "${searchQuery}"`}
        </h2>

        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
        />
      </div>
    </section>
  );
};

export default TaskManagement;
