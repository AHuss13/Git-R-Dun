import react, { useContext, useState } from "react";
import { VStack, Flex, Box } from "@chakra-ui/react";
import { Context } from "../context/UserContext";

function UserList() {
  const { tasks, getUsersFromDatabase, addUsersToDatabase } =
    useContext(UsersContext);

  return (
    <VStack
      spacing={8}
      w="100%"
      h="100vh"
      bgColor="gray.100"
      px="6"
      py="6"
      className="user-list"
    >
      {tasks.map((task) => (
        <Flex
          w="100%"
          bgColor="gray.50"
          h="80px"
          borderRadius="10px"
          shadow="md"
          align="center"
          px="5"
          justify="space-between"
        >
          <Box>{user.name}</Box>
          <Box>{user.owner}</Box>
          <Box
            fontSize={11}
            color={"gray.400"}
            width={"8%"}
            borderRadius={"7px"}
            textAlign="center"
            fontWeight="bold"
          >
            {User.status}
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}

export default UserList;
