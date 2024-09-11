import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";


// Create the provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 0, name: "Task Name", owner: "Task Owner", status: "Status" },
    { id: 1, name: "Task 1", owner: "John", status: "Done" },
    { id: 2, name: "Task 2", owner: "Jane", status: "In Progress" },
    { id: 3, name: "Task 3", owner: "Bob", status: "Not Started" },
  ]);
  const [projects, setProjects] = useState([]);
  const { loading, error, data: projectData } = useQuery(QUERY_PROJECTS);

  useEffect(() => {
    if (!loading && !error && projectData && projectData.projects) {
      setProjects(projectData.projects);
      console.log(projectData.projects);
      console.log(projects);
    }
  }, [loading, error, projectData]);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const getTasksFromDatabase = () => {
    /**
     * This function is intended to fetch tasks from the database.
     * It should make an API call or interact with a database library
     * to retrieve the tasks and update the 'tasks' state.
     */
  };

  const addTask = (taskName, taskDescription) => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      owner: "New Owner",
      status: "Not Started",
      description: taskDescription,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const statusOrder = ["Not Started", "In Progress", "Done"];
        const currentIndex = statusOrder.indexOf(task.status);
        const newIndex = (currentIndex + 1) % statusOrder.length;
        return { ...task, status: statusOrder[newIndex] };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasksFromDatabase, addTask, updateTaskStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Create the context
export const TaskContext = createContext();