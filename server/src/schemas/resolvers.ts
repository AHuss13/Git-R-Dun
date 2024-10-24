// Be careful with changing this file!

import { User, Project, Task } from "../models/index.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface UserArgs {
  username: string;
}

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

interface ProjectArgs {
  projectId: string;
}

interface AddProjectArgs {
  input: {
    name: string;
    description: string;
  };
}

interface UpdateProjectArgs {
  projectId: string;
  input: {
    name: string;
    description: string;
  };
}

interface RemoveProjectArgs {
  projectId: string;
}

interface TaskArgs {
  taskId: string;
}

interface AddTaskArgs {
  projectId: string;
  input: {
    name: string;
    status: string;
  };
}

interface RemoveTaskArgs {
  projectId: string;
  taskId: string;
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
        const project = await Project.findById(projectId).populate("tasks");
        return project;
      } catch (error) {
        throw new Error("Failed to fetch project");
      }
    },

    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (error) {
        throw new Error("Failed to fetch tasks");
      }
    },

    task: async (_parent: any, { taskId }: TaskArgs) => {
      try {
        const task = await Task.findById(taskId);
        return task;
      } catch (error) {
        throw new Error("Failed to fetch task");
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
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (error) {
        console.error("Login error:", error);
        if (error instanceof AuthenticationError) {
          throw error;
        }
        throw new Error(
          `Login failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    },

    addProject: async (
      _parent: any,
      { input }: AddProjectArgs,
      context: any
    ) => {
      if (context.user) {
        const project = await Project.create({ ...input });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { projects: project._id } }
        );
        return project;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTask: async (
      _parent: any,
      { projectId, input }: AddTaskArgs,
      context: any
    ) => {
      if (context.user) {
        const task = await Task.create(input);
        await Project.findByIdAndUpdate(
          projectId,
          { $push: { tasks: task._id } },
          { new: true }
        );
        return task;
      }
      throw new AuthenticationError("Failed to add task!");
    },

    removeProject: async (
      _parent: any,
      { projectId }: RemoveProjectArgs,
      context: any
    ) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
        });
        if (!project) {
          throw new AuthenticationError("Failed to remove project!");
        }
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { projects: project._id } }
        );
        return project;
      }
      throw new AuthenticationError("Failed to remove project!");
    },

    removeTask: async (
      _parent: any,
      { taskId }: RemoveTaskArgs,
      context: any
    ) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({ _id: taskId });

        if (!task) {
          throw new AuthenticationError("Failed to remove task!");
        }
        return task;
      }
      throw new AuthenticationError("Failed to remove task!");
    },

    updateProject: async (
      _parent: any,
      { projectId, input }: UpdateProjectArgs,
      context: any
    ) => {
      if (context.user) {
        return Project.findOneAndUpdate({ _id: projectId }, input, {
          new: true,
          runValidators: true,
        });
      }
      throw new AuthenticationError("Failed to update project!");
    },
  },
};

export default resolvers;
