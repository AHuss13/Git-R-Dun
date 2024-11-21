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
      return User.find().populate({
        path: "projects",
        populate: {
          path: "tasks",
          model: "Task",
        },
      });
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
        const projects = await Project.find().populate({
          path: "tasks",
          model: "Task",
        });
        return projects;
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    },

    project: async (_parent: any, { projectId }: ProjectArgs) => {
      try {
        const project = await Project.findById(projectId).populate({
          path: "tasks",
          model: "Task",
        });
        return project;
      } catch (error) {
        throw new Error("Failed to fetch project");
      }
    },

    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "projects",
          populate: {
            path: "tasks",
            model: "Task",
          },
        });
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

    myTasks: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const userProjects = await Project.find({ owner: context.user._id });
      if (!userProjects || userProjects.length === 0) {
        return []; // Return empty array if user has no projects
      }

      const projectIds = userProjects.map((project) => project._id);
      const tasks = await Task.find({ project: { $in: projectIds } });
      return tasks;
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
        const user = await User.findOne({ email: email.toLowerCase() });

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
        try {
          const project = await Project.create({
            ...input,
            owner: context.user._id,
          });

          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { projects: project._id } },
            { new: true }
          );

          return project;
        } catch (error) {
          throw new Error("Failed to create project");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTask: async (
      _parent: any,
      { projectId, input }: AddTaskArgs,
      context: any
    ) => {
      if (context.user) {
        const project = await Project.findOne({
          _id: projectId,
          owner: context.user._id,
        });

        if (!project) {
          throw new AuthenticationError(
            "Project not found or you don't have permission!"
          );
        }

        try {
          const task = await Task.create({
            ...input,
            project: projectId,
          });

          await Project.findByIdAndUpdate(
            projectId,
            { $push: { tasks: task._id } },
            { new: true }
          );

          return task;
        } catch (error) {
          throw new Error("Failed to create task");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeProject: async (
      _parent: any,
      { projectId }: RemoveProjectArgs,
      context: any
    ) => {
      if (context.user) {
        try {
          // Find the project
          const project = await Project.findOne({
            _id: projectId,
            owner: context.user._id,
          });

          if (!project) {
            throw new AuthenticationError(
              "Project not found or you don't have permission!"
            );
          }

          // Delete all tasks associated with this project
          await Task.deleteMany({ project: projectId });

          // Delete the project
          await Project.findByIdAndDelete(projectId);

          // Remove project reference from user
          await User.findByIdAndUpdate(context.user._id, {
            $pull: { projects: projectId },
          });

          return project;
        } catch (error) {
          console.error("Error removing project:", error);
          throw new Error("Failed to remove project and its tasks!");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeTask: async (
      _parent: any,
      { taskId }: RemoveTaskArgs,
      context: any
    ) => {
      if (context.user) {
        const task = await Task.findById(taskId).populate("project");
        if (!task) {
          throw new Error("Task not found");
        }

        const project = await Project.findOne({
          _id: task.project,
          owner: context.user._id,
        });

        if (!project) {
          throw new AuthenticationError(
            "You don't have permission to remove this task!"
          );
        }

        await Task.findByIdAndDelete(taskId);
        await Project.findByIdAndUpdate(task.project, {
          $pull: { tasks: taskId },
        });

        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
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
