import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import TaskList from "./components/taskList";
// import Members from "./components/Members";
import Projects from "./pages/ProjectPage";
import Homepage from "./pages/Homepage";
import Userpage from "./pages/Userpage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/projectpage", //TODO add project id to path
        element: <Projects />,
      },
      // {
      //   path: "/members",
      //   element: <Members />,
      // },
      {
        path: "/userpage",
        element: <Userpage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
} else {
  console.error("Root element not found");
}
