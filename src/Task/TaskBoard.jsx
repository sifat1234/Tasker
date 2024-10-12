import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";
import NoTasksFound from "./NoTasksFound";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "I want to learn react such that I can build a web application",
    tags: ["web", "react", "javascript"],
    priority: "high",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTasks]);
  const [filteredTasks, setFilteredTasks] = useState([...tasks]); // Keep a filtered version of tasks

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newtask, isAdd) {
  let updatedTasks;
  
  if (isAdd) {
    updatedTasks = [...tasks, newtask];
  } else {
    updatedTasks = tasks.map((task) => 
      task.id === newtask.id ? newtask : task
    );
  }
  
  setTasks(updatedTasks);
  setFilteredTasks(updatedTasks); // Update filteredTasks to reflect the new state
  setShowAddModal(false);
}

function handleFavTask(taskId) {
  const takeIndex = tasks.findIndex((task) => task.id === taskId);
  const newTasks = [...tasks];
  newTasks[takeIndex].isFavorite = !newTasks[takeIndex].isFavorite;
  setTasks([...newTasks]);
  setFilteredTasks([...tasks]); 

}

function handleCloseClick() {
  setShowAddModal(false);
  setTaskToUpdate(null);
}

function handleDeleteAllTasks() {
  setTasks([]);
  setFilteredTasks([]);
}


  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  }
  
  
  function handleSearch(searchTerm) {
    
    if (searchTerm.trim() === '') {
     
      setFilteredTasks([...tasks]);
    } else {
      
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks([...filteredTasks]); 
    }
  }
  


  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}

      <div className="container">
        <div className="p-2 flex justify-end">
          <TaskSearch onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllTasks}
          />
            {
            tasks.length>0 ?
            (<TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavTask}
            />) :(<NoTasksFound/>)
          }
          
        </div>
      </div>
    </section>
  );
}
