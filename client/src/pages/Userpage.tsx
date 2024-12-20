import { useState, FormEvent, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Heading,
  Card,
  CardBody,
  Box,
  Text,
  Input,
  VStack,
  Container,
  Spinner,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_ME_PROJECTS } from "../utils/queries";
import { ADD_PROJECT } from "../utils/mutations";
import ProjectList from "../components/projectList";

const Userpage = () => {
  const {
    loading: projectsLoading,
    data: userData,
    error: projectsError,
  } = useQuery(QUERY_ME_PROJECTS);
  const projects = userData?.me?.projects || [];

  const [formState, setFormState] = useState({
    name: "",
    description: "",
  });

  const [addProject, { error: addProjectError }] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: QUERY_ME_PROJECTS }],
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await addProject({
        variables: {
          input: {
            name: formState.name,
            description: formState.description,
          },
        },
      });
      console.log("Project added:", data);
      // Clear form fields after successful submission
      setFormState({
        name: "",
        description: "",
      });
    } catch (e) {
      console.error("Error adding project:", e);
      if (e instanceof Error) {
        // Display an error message to the user
        alert(e.message);
      } else {
        // Handle other errors
        alert("An error occurred while adding the project. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
    }
    if (addProjectError) {
      console.error("Error adding project:", addProjectError);
    }
  }, [projectsError, addProjectError]);

  if (projectsLoading) {
    return <Spinner />;
  }

  if (!Auth.loggedIn()) {
    return (
      <Container>
        <Text fontSize="xl">
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg">
      <VStack spacing={8} align="stretch">
        <ProjectList projects={projects} />

        <Card>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Heading size="md">Create a New Project</Heading>
              <form onSubmit={handleFormSubmit}>
                <VStack spacing={3}>
                  <FormControl isRequired>
                    <FormLabel>Project Name</FormLabel>
                    <Input
                      placeholder="Enter project name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Project Description</FormLabel>
                    <Input
                      placeholder="Enter project description"
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full">
                    Create Project
                  </Button>
                </VStack>
              </form>
            </VStack>
          </CardBody>
        </Card>
        {addProjectError && (
          <Box>
            <Text color="red.500">
              Error creating project: {addProjectError.message}
            </Text>
          </Box>
        )}
        <Button as={Link} to="/" colorScheme="blue">
          Home Page
        </Button>
      </VStack>
    </Container>
  );
};

export default Userpage;
