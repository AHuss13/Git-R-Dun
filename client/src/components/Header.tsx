import { Heading, Wrap, Box, Text, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeToggle } from "../utils/ColorMode";

export const Header = () => (
  <>
    <Heading as="h1" size="3xl" textAlign="center">
      Git-R-Dun
      <br />
      <Text fontSize="2xl">Get your projects done!</Text>
    </Heading>

    <Flex alignItems={"end"}>
      <Wrap>
        <Button colorScheme="green" m="5px">
          <Link to={"/login"}>Login</Link>
        </Button>

        {/* Logout button if user is logged in */}

        <Button colorScheme="purple" m="5px">
          <Link to={"/signup"}>Register</Link>
        </Button>
        <Box m="5px">
          <ColorModeToggle />
        </Box>
      </Wrap>
    </Flex>
  </>
);

//==== This is just me playing around with the layout to see what I can do with it =====//

// import { Heading, Flex, Box, Grid, GridItem, Spacer} from "@chakra-ui/react";

// export const Header = () => (
//   <>
//     <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(2, 1fr)">
//       <Spacer/>
//       <GridItem rowSpan={2} colSpan={1}>
//         <Heading as="h1" size="3xl" textAlign="center">
//           Git-R-Dun
//           <Heading as="h2" size="md">
//             Get your projects done!
//           </Heading>
//         </Heading>
//       </GridItem>
//       <GridItem rowSpan={1} colSpan={1}>
//         <Flex align="flex-end" flex-wrap>
//           <Button colorScheme="purple" m="5px">
//             <Link to={"/login"}>Login</Link>
//           </Button>
//           <Button colorScheme="purple" m="5px">
//             <Link to={"/signup"}>Register</Link>
//           </Button>
//           <Box m="5px">
//             <ColorModeToggle />
//           </Box>
//         </Flex>
//       </GridItem>
//     </Grid>
//   </>
// );
