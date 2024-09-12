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

//ChakraBaseProvider#
//As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming.

//One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.

// notes
// import {
//   ChakraBaseProvider,
//   extendBaseTheme,
//   theme as chakraTheme,
// } from '@chakra-ui/react'

// const { Button } = chakraTheme.components

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })

// function App() {
//   return (
//     <ChakraBaseProvider theme={theme}>
//       <Component {...pageProps} />
//     </ChakraBaseProvider>
//   )
// }
