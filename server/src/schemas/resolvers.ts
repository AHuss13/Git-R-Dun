import { User, Project, Task } from "../models";
import { signToken, AuthenticationError } from "../utils/auth";

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
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
    addUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw AuthenticationError;
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
    
      return { token, user };
    },

    addProject: async (_parent: any, { name, description, owner, members }: { name: string, description: string, owner: string, members: string[] }) => {
      const project = await Project.create({
        name,
        description,
        owner,
        members,
      });
      console.log(project);
      return project;
    },
    addTask: async (_parent: any, { name, status, projectId, owner }: { name: string, status: string, projectId: string, owner: string }) => {
      const task = await Task.create({
        name,
        status,
        projectId,
        owner,
      });
      console.log(task);
      return task;
    },
    // Copied currently
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

    removeProject: async (_parent: any, { projectId }: { projectId: string }, context: any) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
        });
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { Projects: Project._id } }
        );
        return project;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
