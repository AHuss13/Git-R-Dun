import react, { useContext, useState } from "react";
import { Heading, Stack, Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Heading size="lg" my="5px">
        Login
      </Heading>
      <Stack spacing={3}>
        <Input placeholder="Username" size="sm" />
        <Input placeholder="Password" size="sm" />
      </Stack>
      <Link to={"/userpage"}>
        <Button colorScheme="purple" my="5px">
          Login
        </Button>
      </Link>
      <Heading size="lg" my="5px">
        Register
      </Heading>
      <Stack spacing={3}>
        <Input placeholder="Username" size="sm" />
        <Input placeholder="Email" size="sm" />
        <Input placeholder="Password" size="sm" />
      </Stack>
      <Link to={"/userpage"}>
        <Button colorScheme="purple" my="5px">
          Register
        </Button>
      </Link>
    </>
  );
}

export default Homepage;
