// 1. import `ChakraProvider` component
import { ChakraProvider, Heading } from "@chakra-ui/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// export default function ApolloProvider({ children }) {
//   return <Provider client={client}>{children}</Provider>;
// }

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Heading as="h1" size="2xl" my="5px">
          Git-R-Dun
        </Heading>
        <Outlet />
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;