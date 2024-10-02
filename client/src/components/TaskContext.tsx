import { createContext, useEffect, useState, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";

interface Task {
  id: number;
  name: string;
  owner: string;
  status: string;
  description?: string;
}

interface TaskContextType {
  tasks: Task[];
  getTasksFromDatabase: () => void;
  addTask: (taskName: string, taskDescription: string) => void;
  updateTaskStatus: (taskId: number) => void;
}

// Create the provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
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

  const addTask = (taskName: string, taskDescription: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: taskName,
      owner: "New Owner",
      status: "Not Started",
      description: taskDescription,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const statusOrder = ["Not Started", "In Progress", "Done"];
        const currentIndex = statusOrder.indexOf(task.status);
        const newIndex = (currentIndex + 1) % statusOrder.length;
        return { ...task, status: statusOrder[newIndex] };
      }
      return task;
    });
    setTasks(updatedTasks as Task[]);
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
export const TaskContext = createContext<TaskContextType | undefined>(undefined);
