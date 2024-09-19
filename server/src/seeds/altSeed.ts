import mongoose from "mongoose";
import { User, Project } from "../models/index.js";
import userSeeds from "./userSeeds.json" assert { type: "json" };
import cleanDB from './cleanDB.js';
import projectSeeds from "./projectSeeds.json" assert { type: "json" };

interface ProjectSeed {
  _id: string;
  owner: string;
}

const typedProjectSeeds: ProjectSeed[] = projectSeeds as unknown as ProjectSeed[];

mongoose.connection.once("open", async () => {
  try {
    await cleanDB();

    await User.create(userSeeds);

    for (let i = 0; i < typedProjectSeeds.length; i++) {
      const { _id, owner } = await Project.create(typedProjectSeeds[i]);
      await User.findOneAndUpdate(
        { username: owner },
        {
          $addToSet: {
            projects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
