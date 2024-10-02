import { User, Project, Task } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  username: string;
}

interface AddProjectArgs {
  input: {
    name: string;
    description: string;
    // owner: string;
    members: string[];
  };
}

interface AddTaskArgs {
  projectId: string;
  name: string;
  status: string;
}

// interface UpdateProjectArgs {
//   _id: string;
//   name: string;
//   description: string;
//   members: string[];
// }

interface RemoveProjectArgs {
  projectId: string;
  taskID: string;
}

interface ProjectArgs {
  projectId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("projects");
    },
    user: async (_parent: any, { username }: UserArgs) => {
      try {
        const user = await User.findOne({ username }).populate("projects");
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    projects: async () => {
      try {
        const projects = await Project.find();
        return projects;
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    },
    project: async (_parent: any, { projectId }: ProjectArgs) => {
      try {
        const project = await Project.findOne({ _id: projectId });
        return project;
      } catch (error) {
        throw new Error("Failed to fetch project");
      }
    },
    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (error) {
        throw new Error("Failed to fetch tasks");
      }
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      try {
        const user = await User.create({ ...input });
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password credentials");
        // TODO: Remove "password" from the error message after working
      }
      const token = signToken(user.username, user.email, user._id);

      return { token, user };
    },

    addProject: async (
      _parent: any,
      { input }: AddProjectArgs,
      context: any
    ) => {
      if (context.user) {
        // Find the user by the owner's username
        const owner = await User.findOne({ username: input.owner });
    
        if (!owner) {
          throw new Error('Owner not found');
        }
        const project = await Project.create({ ...input, owner: context.user._id });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { projects: project._id } }
        );

        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTask: async (
      _parent: any,
      { projectId, name, status }: AddTaskArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              task: { name, status },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Failed to add Task"!);
    },

    // updateProject: async (parent, { id, name, description, members }) => {
    //   const project = await Project.findOneAndUpdate({
    //     id,
    //     name,
    //     description,
    //     members,
    //   });
    //   console.log(project);
    //   return project;
    // },

    removeProject: async (
      _parent: any,
      { projectId, taskID }: RemoveProjectArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndDelete(
          {_id: projectId},
          {task: { _id: taskID }}
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
