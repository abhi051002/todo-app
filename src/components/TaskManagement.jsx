import React from "react";
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
  return (
    <section className="task-management">
      <TaskForm categories={categories} handleTaskSubmit={handleTaskSubmit} />

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
          handleEditTask={(task) => {
            // This will be handled by the TaskForm component directly
          }}
        />
      </div>
    </section>
  );
};

export default TaskManagement;
