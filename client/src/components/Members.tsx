import react, { useContext, useState } from "react";
import TaskList from "./taskList";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Text,
  StackDivider,
  Box,
} from "@chakra-ui/react";

function Members() {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <Text pt="2" fontSize="sm">
              View a summary of all your clients over the last month.
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <TaskList />
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default Members;
