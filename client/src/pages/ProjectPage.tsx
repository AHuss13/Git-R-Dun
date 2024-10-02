import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECT } from "../utils/queries";

const Project = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_PROJECT, {
    variables: { projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </div>
      <Box borderWidth="2px" borderColor="red">
        Project info will be here
      </Box>
    </>
  );
};

export default Project;
