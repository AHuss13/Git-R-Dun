// Be careful with changing this file!

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

interface ProjectArgs {
  projectId: string;
}

interface AddProjectArgs {
  input: {
    name: string;
    description: string;
    owner: string;
  };
}

interface AddTaskArgs {
  projectId: string;
  name: string;
  status: string;
}

interface UpdateProjectArgs {
  _id: string;
  name: string;
  description: string;
  owner: string;
}

interface RemoveTaskArgs {
  projectId: string;
  taskID: string;
}

interface RemoveProjectArgs {
  projectId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_parent: any, { username }: UserArgs) => {
      try {
        const user = await User.findOne({ username });
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
    addUser: async (_parent: unknown, { input }: AddUserArgs) => {
      try {
        const user = await User.create(input);
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (error) {
        throw new Error(`Failed to create user: ${error}`);
      }
    },

    login: async (_parent: unknown, { email, password }: LoginUserArgs) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (error) {
        throw new Error(`Login failed: ${error}`);
      }
    },

    addProject: async (
      _parent: any,
      { input }: AddProjectArgs,
      context: any
    ) => {
      if (context.user) {
        try {
          const project = await Project.create({
            ...input,
            owner: context.user._id,
          });

          await User.findOneAndUpdate(
            { _id: project.owner },
            { $push: { projects: project._id } }
          );

          return await Project.findById(project._id).populate("owner");
        } catch (error: any) {
          if (error.code === 11000) {
            throw new Error("A project with this ID already exists");
          }
          throw error;
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateProject: async (
      _parent: any,
      { _id, name, description }: UpdateProjectArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id },
          { name, description },
          { new: true, runValidators: true }
        ).populate("owner");
      }
      throw new AuthenticationError("Failed to update project!");
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
            $push: {
              tasks: { name, status },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate("owner");
      }
      throw new AuthenticationError("Failed to add task!");
    },

    removeTask: async (
      _parent: any,
      { projectId, taskID }: RemoveTaskArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          { $pull: { tasks: { _id: taskID } } },
          { new: true }
        ).populate("owner");
      }
      throw new AuthenticationError("Failed to remove task!");
    },

    removeProject: async (
      _parent: any,
      { projectId }: RemoveProjectArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndDelete({ _id: projectId }).populate("owner");
      }
      throw new AuthenticationError("Failed to remove project!");
    },
  },
};

export default resolvers;
