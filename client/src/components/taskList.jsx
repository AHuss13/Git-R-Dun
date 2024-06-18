import React, { useContext, useState } from "react";
import {
  VStack,
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { TaskContext } from "../context/TaskContext";
import { Link } from "react-router-dom";

function TaskList() {
  const { tasks, addTask, updateTaskStatus } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      addTask(taskName, taskDescription);
      setTaskName("");
      setTaskDescription("");
      setIsOpen(false);
    }
  };

  const handleStatusClick = (taskId) => {
    updateTaskStatus(taskId);
  };

  return (
    <>
      <Heading as="h2" size="xl">
        Project Name
      </Heading>
      <Heading as="h4" size="md">
        Project Description
      </Heading>
      <Heading as="h2" size="xl" my="5px">
        Members
      </Heading>
      <Text pt="2" fontSize="sm">
        <ul>
          <li>Group Member 1</li>
          <li>Group Member 2</li>
          <li>Group Member 3</li>
        </ul>
      </Text>
      <Heading as="h2" size="xl" my="5px">
        Tasks
      </Heading>
      <VStack
        spacing={8}
        w="100%"
        bgColor="gray.100"
        px="6"
        py="6"
        className="task-list"
      >
        {tasks.map((task) => (
          <Flex
            key={task.id}
            w="100%"
            bgColor="gray.50"
            h="80px"
            borderRadius="10px"
            shadow="md"
            align="center"
            px="5"
            justify="space-between"
          >
            <Box>{task.name}</Box>
            <Box>{task.owner}</Box>
            <Box
              fontSize={11}
              color={"gray.400"}
              width={"8%"}
              borderRadius={"7px"}
              textAlign="center"
              fontWeight="bold"
              bgColor={
                task.status === "Done"
                  ? "green.700"
                  : task.status === "In Progress"
                  ? "blue.800"
                  : task.status === "Not Started"
                  ? "red.600"
                  : ""
              }
              cursor="pointer"
              onClick={() => handleStatusClick(task.id)}
            >
              {task.status}
            </Box>
          </Flex>
        ))}
      </VStack>
      <Button onClick={() => setIsOpen(true)} colorScheme="teal" my="2px">
        Add Task
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddTask}>
              Add Task
            </Button>
            <Button ml={3} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack spacing={4} direction="row" align="center" my="2px">
        <Link to={"/"}>
          <Button colorScheme="blue" size="sm">
            Home Page
          </Button>
        </Link>
      </Stack>
      <Stack spacing={4} direction="row" align="center" my="2px">
        <Link to={"/userpage"}>
          <Button colorScheme="purple" size="sm">
            User Page
          </Button>
        </Link>
      </Stack>
    </>
  );
}

export default TaskList;
