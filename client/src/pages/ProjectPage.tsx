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
import { QUERY_PROJECT, QUERY_USERS } from "../utils/queries";
import { ADD_PROJECT, UPDATE_PROJECT } from "../utils/mutations";
import Select from "react-select";
import Auth from "../utils/auth";

interface Member {
  _id: string;
  username: string;
}

interface Task {
  _id: string;
  name: string;
  status: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  members: Member[];
  owner: Member;
  tasks: Task[];
}

interface User {
  _id: string;
  username: string;
}

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { loading, error, data } = useQuery<{ project: Project }>(
    QUERY_PROJECT,
    {
      variables: { projectId: id },
      skip: !id,
    }
  );

  const { data: usersData } = useQuery<{ users: User[] }>(QUERY_USERS);

  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: ["GetProjects"],
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: ["GetProject"],
  });

  useEffect(() => {
    if (data?.project && id) {
      setName(data.project.name);
      setDescription(data.project.description);
      setSelectedMembers(data.project.members.map((member) => member._id));
    }
  }, [data, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProject({
          variables: {
            projectId: id,
            name,
            description,
            members: selectedMembers,
          },
        });
        setIsEditing(false);
      } else {
        const { data } = await addProject({
          variables: {
            name,
            description,
            owner: Auth.getProfile().data.id
          },
        });
        navigate(`/project/${data.addProject.id}`);
      }
      setIsEditing(false);
      setName("");
      setDescription("");
      setSelectedMembers([]);
    } catch (err) {
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
            <FormControl>
              <FormLabel>Project Members</FormLabel>
              <Select
                isMulti
                placeholder="Select members"
                value={selectedMembers.map((id) => ({
                  value: id,
                  label:
                    usersData?.users?.find((user) => user._id === id)
                      ?.username || "",
                }))}
                onChange={(selectedOptions: any) => {
                  if (Array.isArray(selectedOptions)) {
                    setSelectedMembers(
                      selectedOptions.map((option) => option.value)
                    );
                  }
                }}
                options={
                  usersData?.users?.map((user) => ({
                    value: user._id,
                    label: user.username,
                  })) || []
                }
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
    members,
    tasks,
    owner,
  } = data.project;

  return (
    <Box>
      <Heading as="h2">{projectName}</Heading>
      <Text>{projectDescription}</Text>
      <Heading as="h3" size="md" mt={4}>
        Owner
      </Heading>
      <Text>{owner.username}</Text>
      <Heading as="h3" size="md" mt={4}>
        Members
      </Heading>
      <UnorderedList>
        {members.map((member) => (
          <ListItem key={member._id}>{member.username}</ListItem>
        ))}
      </UnorderedList>
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
