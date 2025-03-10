import React from "react";
import { Plus } from "lucide-react";

const Sidebar = ({
  filter,
  setFilter,
  categories,
  selectedCategory,
  setSelectedCategory,
  handleAddCategory,
  clearCompletedTasks,
}) => {
  return (
    <aside className="sidebar">
      <h3>Filters</h3>
      <div className="filter-group">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <h3>Categories</h3>
      <div className="category-list">
        <button
          className={!selectedCategory ? "active" : ""}
          onClick={() => setSelectedCategory("")}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="add-category" onClick={handleAddCategory}>
          <Plus size={14} /> Add Category
        </button>
      </div>

      <div className="action-buttons">
        <button className="danger" onClick={clearCompletedTasks}>
          Clear Completed
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
