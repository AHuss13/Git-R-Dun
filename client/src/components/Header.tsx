import { Heading, Wrap, Box, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeToggle } from "../utils/ColorMode";
import Auth from "../utils/auth";

export const Header = () => (
  <>
    <Heading as="h1" size="3xl" textAlign="center">
      Git-R-Dun
      <br />
      <Text fontSize="2xl">Get your projects done!</Text>
    </Heading>

    <Flex justifyContent="space-between" alignItems="center">
      <Wrap>
        {/* Login button */}
        {!Auth.loggedIn() && (
          <Button colorScheme="green" m="5px">
            <Link to={"/login"}>Login</Link>
          </Button>
        )}

        {/* Register button */}
        {!Auth.loggedIn() && (
          <Button colorScheme="purple" m="5px">
            <Link to={"/signup"}>Register</Link>
          </Button>
        )}

        {Auth.loggedIn() && (
          <Button colorScheme="purple" m="5px" ml="10px">
            <Link to={"/userpage"}>Userpage</Link>
          </Button>
        )}

        {/* Color mode toggle */}
        <Box m="5px">
          <ColorModeToggle />
        </Box>
      </Wrap>

      {/* Logout button */}
      {Auth.loggedIn() && (
        <Button
          colorScheme="red"
          m="5px"
          mr="10px"
          onClick={() => Auth.logout()}
        >
          Logout
        </Button>
      )}
    </Flex>
  </>
);
