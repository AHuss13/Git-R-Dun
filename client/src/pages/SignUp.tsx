import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Input, Button } from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      console.log(formState);
    }
  };

  return (
    <>
    <Header />
    <main className="flex-row justify-center mb-4">
      <div className="col-lg-6">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <Input
                  className="form-input"
                  placeholder="Your username"
                  _placeholder={{ color: "gray.500" }} // Needed to make the placeholder text visible in dark mode
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
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
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default Signup;
