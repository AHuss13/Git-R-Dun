import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./components/taskList.js";
import Members from "./components/Members.js";
import Homepage from "./pages/Homepage.js";
import Userpage from "./pages/Userpage.js";
import ErrorPage from "./pages/ErrorPage.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

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
        path: "/projectpage",
        element: <TaskList />,
      },
      {
        path: "/members",
        element: <Members />,
      },
      {
        path: "/userpage",
        element: <Userpage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
} else {
  console.error("Root element not found");
}
