import db from "../config/connection.js";
import { User, Project, Task } from "../models/index.js";
import cleanDB from "./cleanDB.js";

import userSeeds from "./userSeeds.json" assert { type: "json" };
import projectSeeds from "./projectSeeds.json" assert { type: "json" };
import taskSeeds from "./taskSeeds.json" assert { type: "json" };

try {
  await db();
  await cleanDB();

  // Create all users
  const createdUsers = await User.create(userSeeds);

  // For each user, create their projects and tasks
  for (const user of createdUsers) {
    // Create projects for this user
    for (const projectData of projectSeeds) {
      const project = await Project.create({
        ...projectData,
        owner: user._id,
      });

      // Create tasks for this project
      for (const taskData of taskSeeds) {
        const task = await Task.create({
          ...taskData,
          project: project._id,
        });

        // Add task to project
        await Project.findByIdAndUpdate(project._id, {
          $push: { tasks: task._id },
        });
      }

      // Add project to user
      await User.findByIdAndUpdate(user._id, {
        $push: { projects: project._id },
      });
    }
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
