# Git-R-Dun

## <span style="color:green">Description</span>

Git-R-Dun is a comprehensive planning application designed to help users organize tasks, manage projects, and increase productivity. This project was born out of the need for a more intuitive and flexible task management tool that caters to both personal and professional use.

- Motivation: To create a user-friendly planning tool that simplifies task management and project organization.
- Purpose: To provide a centralized platform for individuals and teams to track, prioritize, and complete tasks efficiently.
- Problem it solves: Git-R-Dun addresses the challenges of task fragmentation, missed deadlines, and poor project visibility by offering a unified solution for task and project management.
- Learning outcomes: Through building this application, I gained valuable experience in full-stack development using the MERN stack, implementing GraphQL APIs, and creating responsive user interfaces with React, Chakra UI, and TypeScript.

## <span style="color:green">Installation</span>

To set up the Git-R-Dun application for development, follow these steps:

1. Clone the repository: `git clone https://github.com/ahuss13/git-r-dun.git  `

2. Navigate to the project directory: `cd git-r-dun  `

3. Install server dependencies: `pnpm install  `

4. Navigate to the client directory and install client dependencies: `cd client
pnpm install  `

5. Create a `.env` file in the root directory and add your MongoDB connection string: `MONGODB_URI=your_mongodb_connection_string  `

6. Add your JWT secret key to the `.env` file: `JWT_SECRET_KEY=your_jwt_secret_key  `

7. Run the build script: `pnpm build  `

8. Seed the database with sample data: `pnpm seed  `

9. Start the development server: `pnpm develop  `

## <span style="color:green">Usage</span>

1. Sign up for an account or log in if you already have one.
2. Create a new project by clicking the "New Project" button.
3. Add tasks to your project by clicking the "Add Task" button.
4. Utilize the dashboard to get an overview of all your projects and tasks.

***Some features may come and go as I continue to learn and improve the application.***

## <span style="color:green">Credits</span>

Contributors:

- Trey Shearin - [GitHub Profile](https://github.com/wshearin3) was a great help with the backend and GraphQL setup in the beginning of the project.

Third-party assets:

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [GraphQL](https://graphql.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Chakra UI](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)

## <span style="color:green">Features</span>

- User authentication and authorization
- Project creation and management
- Task creation, assignment, and tracking
- Drag-and-drop task organization
- Priority setting and due date management
- Project progress visualization
- Responsive design for mobile and desktop use
- Real-time updates using GraphQL subscriptions

## <span style="color:green">Technologies Used</span>

- React
- GraphQL API
- Node.js
- Express.js
- MongoDB
- MERN Stack
- Chakra UI
- TypeScript

## <span style="color:green">License</span>

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
