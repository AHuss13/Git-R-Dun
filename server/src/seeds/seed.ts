// GOLD!

import db from "../config/connection.js";
import { User, Project, Task } from "../models/index.js";
import cleanDB from "./cleanDB.js";

import userSeeds from "./userSeeds.json" assert { type: "json" };
import projectSeeds from "./projectSeeds.json" assert { type: "json" };
import taskSeeds from "./taskSeeds.json" assert { type: "json" };

try {
  await db();
  await cleanDB();

  // bulk create each model
  await User.create(userSeeds);

  await Project.insertMany(projectSeeds);
  await Task.insertMany(taskSeeds);

  console.log("Seeding completed successfully!");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
