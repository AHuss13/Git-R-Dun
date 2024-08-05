import react, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Box,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

function Userpage() {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <>
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
                    <Stack spacing={4} direction="row" align="center" my="2px">
                      <Link to={"/projectpage"}>
                        <Button colorScheme="teal" size="sm">
                          Project 1
                        </Button>
                      </Link>
                    </Stack>
                  </li>
                  <li>
                    <Stack spacing={4} direction="row" align="center" my="2px">
                      <Link to={"/projectpage"}>
                        <Button colorScheme="teal" size="sm">
                          Project 2
                        </Button>
                      </Link>
                    </Stack>
                  </li>
                  <li>
                    <Stack spacing={4} direction="row" align="center" my="2px">
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

export default Userpage;
