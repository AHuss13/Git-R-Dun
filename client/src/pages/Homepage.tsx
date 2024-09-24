import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Link to={"/login"}>
        <Button colorScheme="purple" my="5px">
          Login
        </Button>
      </Link>
      <br />
      <Link to={"/signup"}>
        <Button colorScheme="purple" my="5px">
          Register
        </Button>
      </Link>
    </>
  );
}

export default Homepage;
