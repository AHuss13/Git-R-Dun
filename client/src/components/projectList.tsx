import { Link } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface Project {
  _id: string;
  name: string;
  description: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  if (!projects.length) {
    return <Heading as="h3">No Projects Yet</Heading>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {projects.map((project) => (
        <Box
          key={project._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box bg="primary.500" _dark={{ bg: "primary.700" }} p={2}>
            <Heading
              as="h4"
              size="md"
              color="gray.800"
              _dark={{ color: "gray.100" }}
            >
              <Link to={`/project/${project._id}`}>{project.name}</Link>
            </Heading>
          </Box>
          <Box p={2} bg="gray.50" _dark={{ bg: "gray.700" }}>
            <Text color="gray.800" _dark={{ color: "gray.200" }}>
              {project.description}
            </Text>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default ProjectList;
