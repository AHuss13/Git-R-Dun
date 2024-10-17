import { useState, type FormEvent, type ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Input, Button, Box, Text } from "@chakra-ui/react";

import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Login</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <Input
                    className="form-input"
                    placeholder="Your email"
                    _placeholder={{ color: "gray.500" }} // Needed to make the placeholder text visible in dark mode
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <Input
                    className="form-input"
                    placeholder="******"
                    _placeholder={{ color: "gray.500" }} // Needed to make the placeholder text visible in dark mode
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Button
                    className="btn btn-block btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              )}

              {error && (
                <Box my={3} p={3} bg="red.500" color="white">
                  <Text fontWeight="bold">Error:</Text>
                  <Text>{error.message}</Text>
                  {error.graphQLErrors?.map((err, index) => (
                    <Text key={index}>{err.message}</Text>
                  ))}
                  {error.networkError && <Text>Network error: {error.networkError.message}</Text>}
                </Box>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
