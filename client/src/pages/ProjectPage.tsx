import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  UnorderedList,
  ListItem,
  VStack,
  Spinner,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Container,
  Card,
  CardBody,
  HStack,
  Box,
  IconButton,
} from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROJECT, QUERY_ME_PROJECTS } from "../utils/queries";
import {
  ADD_PROJECT,
  UPDATE_PROJECT,
  ADD_TASK,
  REMOVE_PROJECT,
  REMOVE_TASK,
  UPDATE_TASK,
} from "../utils/mutations";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Task {
  _id: string;
  name: string;
  status: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  tasks: Task[];
}

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("Not Started");
  const [editingTaskName, setEditingTaskName] = useState("");
  const [editingTaskStatus, setEditingTaskStatus] = useState("");
  const { loading, error, data } = useQuery<{ project: Project }>(
    QUERY_PROJECT,
    {
      variables: { projectId: id },
      skip: !id,
    }
  );

  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: QUERY_PROJECT }],
  });

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [addTask] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
      const existingProject = cache.readQuery<{ project: Project }>({
        query: QUERY_PROJECT,
        variables: { projectId: id },
      });

      if (existingProject && existingProject.project) {
        cache.writeQuery({
          query: QUERY_PROJECT,
          variables: { projectId: id },
          data: {
            project: {
              ...existingProject.project,
              tasks: [...existingProject.project.tasks, addTask],
            },
          },
        });
      }
    },
  });

  const [removeProject] = useMutation(REMOVE_PROJECT, {
    onCompleted: () => {
      navigate("/userpage");
    },
    refetchQueries: [{ query: QUERY_ME_PROJECTS }],
    awaitRefetchQueries: true,
  });

  const [removeTask] = useMutation(REMOVE_TASK, {
    // refresh the project page
    refetchQueries: [{ query: QUERY_PROJECT, variables: { projectId: id } }],
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: QUERY_PROJECT, variables: { projectId: id } }],
  });

  useEffect(() => {
    if (data?.project && id) {
      setName(data.project.name);
      setDescription(data.project.description);
    }
  }, [data, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProject({
          variables: {
            projectId: id,
            input: {
              name,
              description,
            },
          },
        });
        setIsEditing(false);
      } else {
        const { data } = await addProject({
          variables: {
            name,
            description,
          },
        });
        navigate(`/project/${data.addProject.id}`);
      }
      setIsEditing(false);
      setName("");
      setDescription("");
    } catch (err: unknown) {
      console.error("Error saving project:", err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask({
        variables: {
          projectId: id,
          input: {
            name: taskName,
            status: taskStatus,
          },
        },
      });
      setTaskName("");
      setTaskStatus("Not Started");
    } catch (err: unknown) {
      console.error("Error adding task:", err);
    }
  };

  const handleDeleteProject = async () => {
    if (
      !id ||
      !window.confirm("Are you sure you want to delete this project?")
    ) {
      return;
    }

    try {
      await removeProject({
        variables: { projectId: id },
      });
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await removeTask({ variables: { taskId } });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEditTask = (task: Task) => {
    setIsEditingTask(task._id);
    setEditingTaskName(task.name);
    setEditingTaskStatus(task.status);
  };

  const handleUpdateTask = async (taskId: string) => {
    try {
      await updateTask({
        variables: {
          taskId,
          input: {
            name: editingTaskName,
            status: editingTaskStatus,
          },
        },
      });
      setIsEditingTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  if (!id || isEditing) {
    return (
      <VStack spacing={4} align="stretch">
        <Heading as="h2">{id ? "Edit Project" : "Create New Project"}</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              {id ? "Update Project" : "Create Project"}
            </Button>
            {id && (
              <Button ml={2} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </VStack>
        </form>
      </VStack>
    );
  }

  if (!data?.project) return <Text>No project found</Text>;

  const {
    name: projectName,
    description: projectDescription,
    tasks,
  } = data.project;

  return (
    <Container maxW="container.lg">
      <VStack spacing={4} align="stretch">
        <Card>
          <CardBody>
            <Box mb={4}>
              <HStack justify="space-between" align="center">
                <Heading size="lg">{projectName}</Heading>
                <HStack>
                  <IconButton
                    aria-label="Edit project"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => setIsEditing(true)}
                  />
                  <IconButton
                    aria-label="Delete project"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={handleDeleteProject}
                  />
                </HStack>
              </HStack>
              <Text mt={2}>{projectDescription}</Text>
            </Box>
          </CardBody>
        </Card>
        <Heading as="h3" size="md" mt={4}>
          Tasks
        </Heading>
        <UnorderedList>
          {tasks.map((task) => (
            <ListItem fontSize="lg" key={task._id}>
              {isEditingTask === task._id ? (
                <HStack spacing={2}>
                  <Input
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                    size="sm"
                  />
                  <Select
                    value={editingTaskStatus}
                    onChange={(e) => setEditingTaskStatus(e.target.value)}
                    size="sm"
                    width="auto"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </Select>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleUpdateTask(task._id)}
                  >
                    Save
                  </Button>
                  <Button size="sm" onClick={() => setIsEditingTask(null)}>
                    Cancel
                  </Button>
                </HStack>
              ) : (
                <HStack justify="space-between">
                  <HStack spacing={2} align="center">
                    <Text
                      fontSize={{
                        base: "14px",
                        sm: "16px",
                        md: "20px",
                        lg: "22px",
                      }}
                    >
                      {task.name}
                    </Text>
                    <Text
                      fontSize={{
                        base: "14px",
                        sm: "16px",
                        md: "20px",
                        lg: "22px",
                      }}
                    >
                      - {task.status}
                      <Box
                        w={{ base: "9px", md: "12px", lg: "14px" }}
                        h={{ base: "9px", md: "12px", lg: "14px" }}
                        mx={2}
                        borderRadius="full"
                        display="inline-flex"
                        alignSelf="center"
                        bg={
                          task.status === "Done"
                            ? "green.400"
                            : task.status === "In Progress"
                            ? "yellow.400"
                            : "red.300"
                        }
                      />
                    </Text>
                  </HStack>
                  <HStack>
                    <IconButton
                      aria-label="Edit task"
                      icon={<EditIcon />}
                      colorScheme="blue"
                      size="xs"
                      onClick={() => handleEditTask(task)}
                    />
                    <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="xs"
                      onClick={() => handleDeleteTask(task._id)}
                    />
                  </HStack>
                </HStack>
              )}
            </ListItem>
          ))}
        </UnorderedList>
        <form onSubmit={handleAddTask}>
          <VStack spacing={4} mt={4}>
            <FormControl isRequired>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="green">
              Add Task
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default ProjectPage;
