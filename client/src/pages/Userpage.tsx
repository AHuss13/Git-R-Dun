import { useQuery } from "@apollo/client";
import {
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Container,
  Box,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_PROJECTS } from "../utils/queries";
// import { Header } from "../components/Header";
import ProjectList from "../components/projectList";

const Userpage = () => {
  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];

  // Display projects if logged in
  if (Auth.loggedIn()) {
    return (
      <>
        <ProjectList projects={projects} />

        <Text fontSize="xl">--------Below this is just Filler!!!--------</Text>
        <Card>
          <CardHeader>
            <Heading size="md">User Page</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Create New Project
                </Heading>
                <Stack spacing={3}>
                  <Input placeholder="Project Name" size="sm" />
                  <Input placeholder="Project Description" size="sm" />
                  <Select placeholder="Select Members">
                    <option value="option1">User 1</option>
                    <option value="option2">User 2</option>
                    <option value="option3">User 3</option>
                  </Select>
                </Stack>
                <Link to={"/projectpage"}>
                  <Button colorScheme="purple" my="5px">
                    Create Project{" "}
                  </Button>
                </Link>
              </Box>
              <Box>
                <Container></Container>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Current Projects
                </Heading>
                <Text pt="2" fontSize="sm">
                  <ul>
                    <li>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        my="2px"
                      >
                        <Link to={"/projectpage"}>
                          <Button colorScheme="teal" size="sm">
                            Project 1
                          </Button>
                        </Link>
                      </Stack>
                    </li>
                    <li>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        my="2px"
                      >
                        <Link to={"/projectpage"}>
                          <Button colorScheme="teal" size="sm">
                            Project 2
                          </Button>
                        </Link>
                      </Stack>
                    </li>
                    <li>
                      <Stack
                        spacing={4}
                        direction="row"
                        align="center"
                        my="2px"
                      >
                        <Link to={"/projectpage"}>
                          <Button colorScheme="teal" size="sm">
                            Project 3
                          </Button>
                        </Link>
                      </Stack>
                    </li>
                  </ul>
                </Text>
              </Box>
              <Stack spacing={4} direction="row" align="center" my="2px">
                <Link to={"/"}>
                  <Button colorScheme="blue" size="sm">
                    Home Page
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <>
  //       <Header />
  //       <h4>
  //         You need to be logged in to see this. Use the navigation links above
  //         to sign up or log in!
  //       </h4>
  //     </>
  //   );
  // }
}

export default Userpage;
