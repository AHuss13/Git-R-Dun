import React, { useState, useEffect } from "react";
import {
  Box,
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
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";
import { ADD_PROJECT, UPDATE_PROJECT } from "../utils/mutations";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    if (data?.project && id) {
      setName(data.project.name);
      setDescription(data.project.description);
    }
  }, [data, id]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Update this URL to your deployed backend URL
        const response = await fetch('https://your-backend-url.onrender.com/api/projects');
        // ...
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

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
    <Box>
      <Heading as="h2">{projectName}</Heading>
      <Text>{projectDescription}</Text>
      <Heading as="h3" size="md" mt={4}>
        Tasks
      </Heading>
      <UnorderedList>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            {task.name} - {task.status}
          </ListItem>
        ))}
      </UnorderedList>
      <Button mt={4} onClick={() => setIsEditing(true)}>
        Edit Project
      </Button>
    </Box>
  );
};

export default ProjectPage;
