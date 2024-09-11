import react, { useContext, useState } from "react";
import { VStack, Flex, Box } from "@chakra-ui/react";
import { ProjectContext } from "../context/ProjectContext";

function ProjectList() {
  const { tasks, getProjectsFromDatabase, addProjectsToDatabase } =
    useContext(ProjectContext);

  return (
    <VStack
      spacing={8}
      w="100%"
      h="100vh"
      bgColor="gray.100"
      px="6"
      py="6"
      className="project-list"
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
          <Box>{project.name}</Box>
          <Box>{project.owner}</Box>
          <Box
            fontSize={11}
            color={"gray.400"}
            width={"8%"}
            borderRadius={"7px"}
            textAlign="center"
            fontWeight="bold"
            bgColor={
              project.status == "Done"
                ? "green.700"
                : project.status == "In Progress"
                ? "blue.800"
                : project.status == "Not Started"
                ? "red.600"
                : ""
            }
          >
            {project.status}
          </Box>
        </Flex>
      ))}
    </VStack>
  );
}

export default ProjectList;
